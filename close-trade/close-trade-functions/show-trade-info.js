export function showTradeInfo(tradeInfo) {
    const tradeInfoModal = document.querySelector(".trade-info-modal");
    const tradeInfoDetails = document.querySelector(".trade-info-details");
    const closeModal = document.getElementById("modal-close-btn");

    tradeInfoDetails.innerHTML = `
    <p>Trade ID: ${tradeInfo.tradeId}</p>
    <p>Asset: ${tradeInfo.asset}</p>
    <p>Entry: ${tradeInfo.entry}</p>
    <p>Position: ${tradeInfo.position}</p>
    <p>Amount: ${tradeInfo.amount}</p>
    <p>Stoploss: ${tradeInfo.stoploss}</p>
    <p>Target: ${tradeInfo.target}</p>
    <p>Date: ${tradeInfo.date}</p>
    <p>Estimated Profit: ${tradeInfo.estimatedProfit}</p>
    <p>Estimated Risk: ${tradeInfo.estimatedRisk}</p>
    <p>Risk To Reward Ratio: ${tradeInfo.riskToRewardRatio}</p>
`;

    tradeInfoModal.style.display = "block";

    closeModal.addEventListener("click", () => {
        tradeInfoModal.style.display = "none";
    });

    window.onclick = function(event) {
        if (event.target == tradeInfoModal) {
            tradeInfoModal.style.display = "none";
        }
    };
}