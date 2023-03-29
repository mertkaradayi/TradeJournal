export function updateTotalProfitLoss(totalProfitLossInfo, profitLoss) {
    const currentTotalProfitLoss =
        parseFloat(totalProfitLossInfo.getAttribute("data-total")) || 0;

    const updatedTotalProfitLoss = currentTotalProfitLoss + profitLoss;
    const epsilon = 0.01;
    let totalProfitLossText = "";

    if (updatedTotalProfitLoss > epsilon) {
        totalProfitLossText = `Total Profit: $${updatedTotalProfitLoss.toFixed(2)}`;
    } else if (Math.abs(updatedTotalProfitLoss) > epsilon) {
        totalProfitLossText = `Total Loss: $${Math.abs(
      updatedTotalProfitLoss
    ).toFixed(2)}`;
    } else {
        totalProfitLossText = "Break Even";
    }

    totalProfitLossInfo.innerHTML = totalProfitLossText;
    totalProfitLossInfo.setAttribute("data-total", updatedTotalProfitLoss);
}