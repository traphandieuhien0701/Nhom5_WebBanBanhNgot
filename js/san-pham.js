// =========================================================
// FILE: san-pham.js
// MỤC ĐÍCH:
// - Lọc sản phẩm theo danh mục.
// - Mỗi lần chỉ được chọn 1 loại.
// - Nếu không chọn loại nào thì hiển thị tất cả.
// =========================================================

const categoryCheckboxes = document.querySelectorAll(".category-checkbox");
const productCards = document.querySelectorAll(".sanpham-card");

categoryCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    if (this.checked) {
      categoryCheckboxes.forEach((otherCheckbox) => {
        if (otherCheckbox !== this) {
          otherCheckbox.checked = false;
        }
      });
    }

    filterProductsByCategory();
  });
});

function filterProductsByCategory() {
  const selectedCheckbox = Array.from(categoryCheckboxes).find(
    (checkbox) => checkbox.checked,
  );

  if (!selectedCheckbox) {
    productCards.forEach((card) => {
      card.classList.remove("is-hidden");
    });
    return;
  }

  const selectedCategory = selectedCheckbox.dataset.category;

  productCards.forEach((card) => {
    const productCategory = card.dataset.category;

    if (productCategory === selectedCategory) {
      card.classList.remove("is-hidden");
    } else {
      card.classList.add("is-hidden");
    }
  });
}
