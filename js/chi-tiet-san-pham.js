document.addEventListener("DOMContentLoaded", function () {
  // Đổi ảnh lớn khi bấm thumbnail
  const mainImage = document.getElementById("mainProductImage");
  const thumbnails = document.querySelectorAll(".thumbnail-item");

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", function () {
      const newImage = this.getAttribute("data-image");

      if (mainImage && newImage) {
        mainImage.src = newImage;
      }

      thumbnails.forEach((item) => item.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Chỉ cho chọn 1 nút trong từng nhóm option
  const optionGroups = document.querySelectorAll(".option-group");

  optionGroups.forEach((group) => {
    const buttons = group.querySelectorAll(".option-btn");

    buttons.forEach((button) => {
      button.addEventListener("click", function () {
        buttons.forEach((btn) => btn.classList.remove("active"));
        this.classList.add("active");
      });
    });
  });
});

// Tăng giảm số lượng
let quantity = 1;

function increaseQuantity() {
  quantity++;
  document.getElementById("quantity").innerText = quantity;
}

function decreaseQuantity() {
  if (quantity > 1) {
    quantity--;
    document.getElementById("quantity").innerText = quantity;
  }
}
