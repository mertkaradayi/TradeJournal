export function updateActiveTradesCounter() {
    const activeTradesContainer = document.getElementById("activeTrades");
    const activeTradesCounter = document.getElementById("activeTradesCounter");
    const tradeElements = activeTradesContainer.getElementsByClassName("trade");

    let shortPositions = 0;
    let longPositions = 0;

    for (let i = 0; i < tradeElements.length; i++) {
        const tradeInfo = tradeElements[i].querySelector(".trade-info p").innerText;
        if (tradeInfo.includes("Position: Short")) {
            shortPositions++;
        } else if (tradeInfo.includes("Position: Long")) {
            longPositions++;
        }
    }

    activeTradesCounter.innerHTML = `(${tradeElements.length})<br>${shortPositions} Shorts | ${longPositions} Longs`;
}