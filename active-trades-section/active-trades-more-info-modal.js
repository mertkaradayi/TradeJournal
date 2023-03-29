export function openMoreInfoModal(tradeInfo) {
    const moreInfoModal = document.getElementById("moreInfoModal");
    const modalContainer = moreInfoModal.parentElement;
    const closeModal = document.querySelector(".close-more-info");
    const modalBody = moreInfoModal.querySelector(".more-info-modal-body");

    // Clear the previous content and add the new trade information
    modalBody.innerHTML = "";
    modalBody.appendChild(tradeInfo);

    // Show the modal
    modalContainer.style.display = "block";

    // Close the modal when the 'X' button is clicked
    closeModal.onclick = function() {
        modalContainer.style.display = "none";
    };

    // Close the modal when clicking outside of it
    window.onclick = function(event) {
        if (event.target == modalContainer) {
            modalContainer.style.display = "none";
        }
    };
}