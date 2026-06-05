const searchInput =
document.getElementById("searchInput");

searchInput.addEventListener("keyup", function () {

    let keyword =
        this.value.toLowerCase();

    let rows =
        document.querySelectorAll(".product-table tbody tr");

    rows.forEach(function (row) {

        let productName =
            row.cells[1].innerText.toLowerCase();

        if(productName.includes(keyword)){
            row.style.display = "";
        }
        else{
            row.style.display = "none";
        }

    });

});
// Lọc theo danh mục
const categoryFilter =
document.getElementById("categoryFilter");

categoryFilter.addEventListener("change", function(){

    let category = this.value;

    let rows =
        document.querySelectorAll(".product-table tbody tr");

    rows.forEach(function(row){

        let rowCategory =
            row.cells[2].innerText.trim();

        if(category === "all"){
            row.style.display = "";
        }
        else if(rowCategory === category){
            row.style.display = "";
        }
        else{
            row.style.display = "none";
        }

    });

});