// =========================================================
// FILE: ho-so.js
// MỤC ĐÍCH:
// - Lấy thông tin người dùng đã đăng nhập từ localStorage.
// - Hiển thị tên, email, số điện thoại lên trang hồ sơ.
// - Nếu chưa đăng nhập thì chuyển về trang đăng nhập.
// =========================================================

document.addEventListener("DOMContentLoaded", function () {
  const currentUserData = localStorage.getItem("sweetcake_current_user");

  if (!currentUserData) {
    alert("Bạn cần đăng nhập để xem hồ sơ.");
    window.location.href = "dang-nhap.html";
    return;
  }

  const currentUser = JSON.parse(currentUserData);

  const profileName = document.getElementById("profileName");
  const profileEmail = document.getElementById("profileEmail");
  const profilePhone = document.getElementById("profilePhone");

  if (profileName) {
    profileName.textContent = currentUser.name;
  }

  if (profileEmail) {
    profileEmail.textContent = currentUser.email;
  }

  if (profilePhone) {
    profilePhone.textContent = currentUser.phone;
  }
});
