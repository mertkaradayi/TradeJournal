export function getProfitLossText(profitLoss) {
    if (profitLoss > 0) {
        return `Profit: ${profitLoss.toFixed(2)}`;
    } else if (profitLoss < 0) {
        return `Loss: ${profitLoss.toFixed(2)}`;
    } else {
        return "Break-even";
    }
}