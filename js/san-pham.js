// Lấy tất cả các ô checkbox dùng để lọc danh mục sản phẩm
const categoryCheckboxes = document.querySelectorAll(".category-checkbox");

// Lấy tất cả các thẻ sản phẩm trên trang
const productCards = document.querySelectorAll(".sanpham-card");

/*
  Duyệt qua từng checkbox danh mục.
  Mỗi checkbox sẽ được gắn sự kiện "change".
  Sự kiện change xảy ra khi người dùng tick hoặc bỏ tick checkbox.
*/
categoryCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    /*
      Nếu checkbox hiện tại đang được tick,
      thì bỏ tick tất cả các checkbox khác.

      Mục đích:
      - Mỗi lần chỉ cho người dùng chọn 1 danh mục.
      - Ví dụ chọn "Bánh kem" thì "Cupcake", "Donut"... sẽ tự bỏ chọn.
    */
    if (this.checked) {
      categoryCheckboxes.forEach((otherCheckbox) => {
        if (otherCheckbox !== this) {
          otherCheckbox.checked = false;
        }
      });
    }

    // Sau khi tick hoặc bỏ tick, gọi hàm lọc sản phẩm
    filterProductsByCategory();
  });
});

/*
  Hàm lọc sản phẩm theo danh mục được chọn.
  Nếu không chọn danh mục nào thì hiển thị tất cả sản phẩm.
  Nếu có chọn danh mục thì chỉ hiển thị sản phẩm thuộc danh mục đó.
*/
function filterProductsByCategory() {
  /*
    Tìm checkbox đang được tick.

    Array.from(categoryCheckboxes):
    - Chuyển danh sách checkbox thành mảng để dùng được hàm find().

    find():
    - Tìm checkbox đầu tiên có checked = true.
  */
  const selectedCheckbox = Array.from(categoryCheckboxes).find(
    (checkbox) => checkbox.checked,
  );

  /*
    Nếu không có checkbox nào được chọn,
    thì hiển thị lại toàn bộ sản phẩm.
  */
  if (!selectedCheckbox) {
    productCards.forEach((card) => {
      // Xóa class is-hidden để sản phẩm hiện ra
      card.classList.remove("is-hidden");
    });

    // Dừng hàm tại đây, không cần lọc tiếp
    return;
  }

  /*
    Lấy danh mục đang được chọn từ data-category của checkbox.

    Ví dụ trong HTML:
    <input class="category-checkbox" data-category="banh-kem">

    Khi đó selectedCategory = "banh-kem"
  */
  const selectedCategory = selectedCheckbox.dataset.category;

  /*
    Duyệt qua từng sản phẩm để kiểm tra sản phẩm đó thuộc danh mục nào.
  */
  productCards.forEach((card) => {
    /*
      Lấy danh mục của từng sản phẩm từ data-category.

      Ví dụ trong HTML:
      <div class="sanpham-card" data-category="banh-kem">
    */
    const productCategory = card.dataset.category;

    /*
      Nếu danh mục của sản phẩm trùng với danh mục được chọn,
      thì hiển thị sản phẩm.

      Nếu không trùng,
      thì ẩn sản phẩm.
    */
    if (productCategory === selectedCategory) {
      // Hiển thị sản phẩm
      card.classList.remove("is-hidden");
    } else {
      // Ẩn sản phẩm
      card.classList.add("is-hidden");
    }
  });
}