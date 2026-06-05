const filterStatus = document.getElementById("filterStatus");
const rows = document.querySelectorAll(".order-table tbody tr");

filterStatus.addEventListener("change", function () {

    const value = this.value;

    rows.forEach(row => {

        const statusEl = row.querySelector(".status");

        if (!statusEl) return;

        const statusText = statusEl.textContent.trim();

        if (value === "all") {
            row.style.display = "";
        }
        else if (statusText === value) {
            row.style.display = "";
        }
        else {
            row.style.display = "none";
        }
    });
});