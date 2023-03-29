import { getProfitLossText } from "/close-trade/close-trade-functions/get-profit-loss-text.js";
import { setBackgroundColor } from "/close-trade/close-trade-functions/set-background-color.js";
import { showTradeInfo } from "/close-trade/close-trade-functions/show-trade-info.js";
import { updateTotalProfitLoss } from "/close-trade/close-trade-functions/update-total-profit-loss.js";

export function addToClosedTrades(
    tradeDiv,
    profitLoss,
    closeAmount,
    closePrice
) {
    const tradeId = tradeDiv.getAttribute("data-trade-id");
    const closedTradesSection = document.getElementById("closedTrades");
    let closedTradeGroup = closedTradesSection.querySelector(
        `[data-trade-id="${tradeId}"]`
    );

    const position = tradeDiv
        .querySelector(".trade-info p")
        .innerText.split("Position: ")[1]
        .split(",")[0];

    const activeAmount = parseFloat(
        tradeDiv
        .querySelector(".trade-info p")
        .innerText.split("Amount: ")[1]
        .split(",")[0]
    );

    if (!closedTradeGroup) {
        closedTradeGroup = document.createElement("div");
        closedTradeGroup.classList.add("closed-trade-group");
        closedTradeGroup.setAttribute("data-trade-id", tradeId);

        const assetAndEntryInfo = document.createElement("p");
        assetAndEntryInfo.innerHTML = `Asset: ${
      tradeDiv
        .querySelector(".trade-info p")
        .innerText.split("Asset: ")[1]
        .split(",")[0]
    }, Entry: ${parseFloat(
      tradeDiv
        .querySelector(".trade-info p")
        .innerText.split("Entry: ")[1]
        .split(",")[0]
    )}, Position: ${position}, Amount: ${activeAmount.toFixed(2)}`;

        // Create a new paragraph element to display the total profit/loss
        // ...
        const totalProfitLossInfo = document.createElement("p");
        totalProfitLossInfo.classList.add("total-profit-loss");
        totalProfitLossInfo.innerHTML = `Total Profit/Loss: $0`;
        totalProfitLossInfo.setAttribute("data-total", "0");
        // ...

        const tradeInfoButton = document.createElement("button");
        tradeInfoButton.innerText = "Trade Info";
        tradeInfoButton.classList.add("trade-info-btn");

        // Add the event listener to show an alert with trade information
        tradeInfoButton.addEventListener("click", () => {
            const tradeInfo = JSON.parse(tradeDiv.dataset.tradeInfo);
            const closeModal = document.querySelector(".close");
            showTradeInfo(tradeInfo, closeModal);
        });

        closedTradeGroup.appendChild(assetAndEntryInfo);
        closedTradeGroup.appendChild(totalProfitLossInfo);
        closedTradeGroup.appendChild(tradeInfoButton);
        closedTradesSection.appendChild(closedTradeGroup);
    }

    const closedTradeDiv = document.createElement("div");
    closedTradeDiv.classList.add("closed-trade");

    const entry = parseFloat(
        tradeDiv
        .querySelector(".trade-info p")
        .innerText.split("Entry: ")[1]
        .split(",")[0]
    );

    const currentDate = new Date();
    const dateString = `${currentDate.getFullYear()}-${(
    currentDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`;

    // Get the current number of closed trades in the group and increment it
    const closedTradeNumber = closedTradeGroup.childElementCount - 2;

    const closedTradeInfo = document.createElement("p");
    // Set the background color based on the profit/loss value
    closedTradeDiv.style.backgroundColor = setBackgroundColor(profitLoss);

    closedTradeInfo.innerHTML = `${closedTradeNumber}. Close Amount: ${closeAmount}, Close Price: ${closePrice}, ${getProfitLossText(
    profitLoss
  )}, Date: ${dateString}`;

    closedTradeDiv.appendChild(closedTradeInfo);

    closedTradeGroup.appendChild(closedTradeDiv);

    const totalProfitLossInfo =
        closedTradeGroup.querySelector(".total-profit-loss");
    updateTotalProfitLoss(totalProfitLossInfo, profitLoss);
}