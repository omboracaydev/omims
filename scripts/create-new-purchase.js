document.addEventListener("DOMContentLoaded", () => {
    const previewBtn = document.getElementById("previewBtn");
    const previewModal = document.getElementById("previewModal");
    const closePreview = document.getElementById("closePreview");

    if (previewBtn && previewModal && closePreview) {
        previewBtn.addEventListener("click", () => {
            previewModal.classList.remove("hidden");
        });

        closePreview.addEventListener("click", () => {
            previewModal.classList.add("hidden");
        });

        // Close when clicking outside modal
        window.addEventListener("click", (e) => {
            if (e.target === previewModal) {
                previewModal.classList.add("hidden");
            }
        });
    } else {
        console.warn("Preview modal elements not found — skipping preview script.");
    }
});
