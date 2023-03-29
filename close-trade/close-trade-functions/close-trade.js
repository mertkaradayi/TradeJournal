import { updateActiveTradesCounter } from "/active-trades-section/counter-active-trade.js";
import { addToClosedTrades } from "/close-trade/close-trade-functions/add-to-closed-trades.js";
import { getProfitLossText } from "/close-trade/close-trade-functions/get-profit-loss-text.js";
import { setBackgroundColor } from "/close-trade/close-trade-functions/set-background-color.js";
import { handleClosedTrade } from "/close-trade/close-trade-functions/handle-closed-trade.js";

export function showCloseTradeForm(tradeDiv) {
    const existingFormContainer = tradeDiv.querySelector(
        ".close-trade-form-container"
    );
    if (existingFormContainer) {
        tradeDiv.removeChild(existingFormContainer);
        return; // If there's already a form container, do nothing
    }

    // Create the form container
    const formContainer = document.createElement("div");
    formContainer.classList.add("close-trade-form-container");

    // Create the form
    const form = document.createElement("form");
    form.classList.add("close-trade-form");

    // Create input elements for amount and close price
    const amountInput = document.createElement("input");
    amountInput.setAttribute("type", "number");
    amountInput.setAttribute("placeholder", "Close Amount");
    amountInput.setAttribute("step", "0.000001");
    amountInput.required = true;

    const closePriceInput = document.createElement("input");
    closePriceInput.setAttribute("type", "number");
    closePriceInput.setAttribute("placeholder", "Close Price");
    closePriceInput.setAttribute("step", "0.000001");
    closePriceInput.required = true;

    // Create the submit button
    const submitButton = document.createElement("button");
    // submitButton.innerText = "Close Trade";
    submitButton.innerText = "Confirm";
    // Append the elements to the form
    // form.appendChild(select);
    form.appendChild(amountInput);
    form.appendChild(closePriceInput);
    form.appendChild(submitButton);

    // Append the form to the form container
    formContainer.appendChild(form);

    // Append the form container to the trade div
    tradeDiv.appendChild(formContainer);

    // Attach event listener to handle form submission
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission and page reload

        // Get the values from the form elements
        const entry = parseFloat(
            tradeDiv
            .querySelector(".trade-info p")
            .innerText.split("Entry: ")[1]
            .split(",")[0]
        );
        const position = tradeDiv
            .querySelector(".trade-info p")
            .innerText.split("Position: ")[1]
            .split(",")[0];

        const closeAmount = parseFloat(amountInput.value);
        const closePrice = parseFloat(closePriceInput.value);

        let closeType;
        if (position === "Long") {
            closeType =
                closePrice > entry ?
                "profit" :
                closePrice < entry ?
                "loss" :
                "break-even";
        } else {
            closeType =
                closePrice < entry ?
                "profit" :
                closePrice > entry ?
                "loss" :
                "break-even";
        }

        // Call a function to handle the closed trade (e.g., add it to the closedTrades section)
        handleClosedTrade(tradeDiv, closeType, closeAmount, closePrice);
    });
}