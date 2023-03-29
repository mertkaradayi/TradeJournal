import { openMoreInfoModal } from "../active-trades-section/active-trades-more-info-modal.js";
import { updateActiveTradesCounter } from "../active-trades-section/counter-active-trade.js";
import { showCloseTradeForm } from "../close-trade/close-trade-functions/close-trade.js";
document
    .getElementById("addNewTradeForm")
    .addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission and page reload

        // Get the values from the input fields
        const assetName = document.getElementById("assetNameInput").value;
        const position = document.getElementById("position").value;
        const amount = document.getElementById("amountInput").value;
        const entry = document.getElementById("entryInput").value;
        const stoploss = document.getElementById("stoplossInput").value;
        const target = document.getElementById("targetInput").value;
        const dateInput = document.getElementById("dateInput").value;
        let estimatedProfitCalc, estimatedRiskCalc;

        if (position === "Long") {
            estimatedProfitCalc = (target - entry) * amount;
            estimatedRiskCalc = (entry - stoploss) * amount;
        } else if (position === "Short") {
            estimatedProfitCalc = (entry - target) * amount;
            estimatedRiskCalc = (stoploss - entry) * amount;
        }

        const riskToRewardRatioCalc = estimatedProfitCalc / estimatedRiskCalc;

        // Create a new div and set its class
        const tradeDiv = document.createElement("div");
        tradeDiv.classList.add("trade");
        tradeDiv.setAttribute("data-trade-id", Date.now());

        // Create a div for the trade info
        const tradeInfoDiv = document.createElement("div");
        tradeInfoDiv.classList.add("trade-info");

        // Create elements for the trade info
        const tradeInfo = document.createElement("p");
        tradeInfo.innerHTML = `Asset: ${assetName}, Position: ${position}, Amount: ${amount}, Entry: ${entry}`;

        // Append the tradeInfo to the tradeInfoDiv
        tradeInfoDiv.appendChild(tradeInfo);

        // Create a div for the buttons
        const buttonsDiv = document.createElement("div");
        buttonsDiv.classList.add("trade-buttons");

        // Create the buttons
        const moreInfoButton = document.createElement("button");
        moreInfoButton.innerHTML = "More Info";
        moreInfoButton.classList.add("more-info-button");

        const moreInfoElement = document.createElement("div");

        addMoreInfoElements(
            moreInfoElement,
            assetName,
            position,
            amount,
            entry,
            stoploss,
            target,
            dateInput,
            estimatedProfitCalc,
            estimatedRiskCalc,
            riskToRewardRatioCalc
        );

        // Store the initial trade information as an object
        const initialTradeInfo = {
            tradeId: Date.now(),
            asset: assetName,
            entry: entry,
            position: position,
            amount: amount,
            stoploss: stoploss,
            target: target,
            date: dateInput,
            estimatedProfit: estimatedProfitCalc,
            estimatedRisk: estimatedRiskCalc,
            riskToRewardRatio: riskToRewardRatioCalc,
            // Add more properties as needed
        };

        // Set the dataset attribute with the JSON string of the initial trade information object
        tradeDiv.dataset.tradeInfo = JSON.stringify(initialTradeInfo);

        moreInfoButton.addEventListener("click", function() {
            openMoreInfoModal(moreInfoElement);
        });

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.classList.add("delete-button");

        const closeTradeButton = document.createElement("button");
        closeTradeButton.innerHTML = "Close Trade";
        closeTradeButton.classList.add("close-trade-button");

        // Append the buttons to the buttonsDiv
        buttonsDiv.appendChild(moreInfoButton);
        buttonsDiv.appendChild(deleteButton);
        buttonsDiv.appendChild(closeTradeButton);

        closeTradeButton.addEventListener("click", () => {
            showCloseTradeForm(tradeDiv);
        });

        // Append the elements to the tradeDiv
        tradeDiv.appendChild(tradeInfoDiv);
        tradeDiv.appendChild(buttonsDiv);

        // Append the tradeDiv to the activeTrades section
        document.getElementById("activeTrades").appendChild(tradeDiv);
        updateActiveTradesCounter();
        deleteButton.addEventListener("click", (e) => {
            if (confirm("Are you sure you want to delete your trade?")) {
                tradeDiv.remove();
                updateActiveTradesCounter();
            }
        });
    });

function addMoreInfoElements(
    moreInfoElement,
    assetName,
    position,
    amount,
    entry,
    stoploss,
    target,
    dateInput,
    estimatedProfitCalc,
    estimatedRiskCalc,
    riskToRewardRatioCalc
) {
    const assetNameE = document.createElement("p");
    assetNameE.textContent = `AssetName: ${assetName}`;

    const positionE = document.createElement("p");
    positionE.textContent = `Position: ${position}`;

    const amountE = document.createElement("p");
    amountE.textContent = `Amount: ${amount}`;

    const entryE = document.createElement("p");
    entryE.textContent = `Entry: ${entry}`;

    const stoplossE = document.createElement("p");
    stoplossE.textContent = `Stoploss: ${stoploss}`;

    const targetE = document.createElement("p");
    targetE.textContent = `Target: ${target}`;

    const dateInputE = document.createElement("p");
    dateInputE.textContent = `Date: ${dateInput};`;

    const estimatedProfitE = document.createElement("p");
    const estimatedRiskE = document.createElement("p");
    const riskToRewardRatioE = document.createElement("p");

    estimatedProfitE.textContent = `Estimated Profit: ${estimatedProfitCalc}`;
    estimatedRiskE.textContent = `Estimated Risk: ${estimatedRiskCalc}`;
    riskToRewardRatioE.textContent = `Risk To Reward Ratio: ${riskToRewardRatioCalc}`;

    moreInfoElement.appendChild(assetNameE);
    moreInfoElement.appendChild(positionE);
    moreInfoElement.appendChild(amountE);
    moreInfoElement.appendChild(entryE);
    moreInfoElement.appendChild(stoplossE);
    moreInfoElement.appendChild(targetE);
    moreInfoElement.appendChild(estimatedProfitE);
    moreInfoElement.appendChild(estimatedRiskE);
    moreInfoElement.appendChild(riskToRewardRatioE);
    moreInfoElement.appendChild(dateInputE);
}