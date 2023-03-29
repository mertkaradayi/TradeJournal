// Create the buttons
const moreInfoButton = document.createElement("button");
moreInfoButton.innerHTML = "More Info";
moreInfoButton.classList.add("more-info-button");

moreInfoButton.addEventListener("click", function() {
    // Call the openMoreInfoModal function and pass the tradeInfo element
    openMoreInfoModal(tradeInfo);
});