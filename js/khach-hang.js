document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.querySelector(".oder-search");
    const filterBox = document.querySelector(".filter-box");
    const rows = document.querySelectorAll(".customer-table tbody tr");

    function filterTable() {

        const keyword = searchInput.value.toLowerCase().trim();
        const statusFilter = filterBox.value;

        rows.forEach(row => {

            const name = row.children[1].textContent.toLowerCase().trim();
            const status = row.querySelector(".status").textContent.trim();

            const matchSearch = name.includes(keyword);
            const matchStatus = (statusFilter === "all" || status === statusFilter);

            if (matchSearch && matchStatus) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    }

    searchInput.addEventListener("input", filterTable);
    filterBox.addEventListener("change", filterTable);

});