import { addToClosedTrades } from "/close-trade/close-trade-functions/add-to-closed-trades.js";
import { updateActiveTradesCounter } from "/active-trades-section/counter-active-trade.js";

export function handleClosedTrade(
    tradeDiv,
    closeType,
    closeAmount,
    closePrice
) {
    // Get the remaining amount from the active trade
    const activeAmount = parseFloat(
        tradeDiv
        .querySelector(".trade-info p")
        .innerText.split("Amount: ")[1]
        .split(",")[0]
    );

    // Calculate the new remaining amount
    const newRemainingAmount = activeAmount - closeAmount;

    if (newRemainingAmount < 0) {
        alert("You cannot close more than the remaining amount of the trade");
        return;
    }

    // Check if the trade is completely closed
    if (newRemainingAmount <= 0) {
        // Remove the trade from the active trades section
        tradeDiv.remove();
    } else {
        // Update the remaining amount in the active trade
        tradeDiv.querySelector(".trade-info p").innerHTML = tradeDiv
            .querySelector(".trade-info p")
            .innerHTML.replace(
                `Amount: ${activeAmount}`,
                `Amount: ${newRemainingAmount.toFixed(2)}`
            );
    }

    // Add the closed portion of the trade to a separate div (you can customize this as needed)
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

    const profitLoss =
        position === "Long" ?
        (closePrice - entry) * closeAmount :
        (entry - closePrice) * closeAmount;

    addToClosedTrades(tradeDiv, profitLoss, closeAmount, closePrice);
    // Update the active trades counter
    updateActiveTradesCounter();
}