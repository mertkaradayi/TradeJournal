// export function initAddNewTradeModal() {
const addNewTradeButton = document.getElementById("addNewTradeButton");
const addNewTradeModal = document.getElementById("addNewTradeModal");
const closeButton = document.querySelector(".close");

// Show the modal when the "Add New Trade" button is clicked
addNewTradeButton.addEventListener("click", () => {
    addNewTradeModal.style.display = "block";
});

// Hide the modal when the "close" button is clicked
closeButton.addEventListener("click", () => {
    addNewTradeModal.style.display = "none";
});

// Hide the modal when clicking outside of the modal content
window.addEventListener("click", (event) => {
    if (event.target === addNewTradeModal) {
        addNewTradeModal.style.display = "none";
    }
});
// }