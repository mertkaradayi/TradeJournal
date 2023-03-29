export function setBackgroundColor(profitLoss) {
    if (profitLoss > 0) {
        return "rgba(40, 167, 69, 0.1)";
    } else if (profitLoss < 0) {
        return "rgba(220, 53, 69, 0.1)";
    } else {
        return "rgba(108, 117, 125, 0.1)";
    }
}