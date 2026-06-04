// =========================================================
// FILE: dang-ky.js
// MỤC ĐÍCH:
// - Xử lý đăng ký 2 bước.
// - Bước 1 lưu họ tên, số điện thoại, email.
// - Bước 2 kiểm tra mật khẩu.
// - Trang thành công hiển thị đúng dữ liệu người dùng nhập.
// =========================================================

document.addEventListener("DOMContentLoaded", function () {
  const STORAGE_KEY = "sweetCakeRegisterData";

  // =========================
  // ĐĂNG KÝ BƯỚC 1
  // File: dang-ky-1.html
  // =========================
  const step1Form = document.getElementById("registerStep1Form");

  if (step1Form) {
    step1Form.addEventListener("submit", function (event) {
      event.preventDefault();

      const fullName = document.getElementById("reg-fullname").value.trim();
      const phone = document.getElementById("reg-phone").value.trim();
      const email = document.getElementById("reg-email").value.trim();

      if (fullName === "") {
        alert("Vui lòng nhập họ và tên!");
        return;
      }

      if (phone === "") {
        alert("Vui lòng nhập số điện thoại!");
        return;
      }

      if (email === "") {
        alert("Vui lòng nhập email!");
        return;
      }

      const registerData = {
        fullName: fullName,
        phone: phone,
        email: email,
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(registerData));

      window.location.href = "dang-ky-2.html";
    });
  }

  // =========================
  // ĐĂNG KÝ BƯỚC 2
  // File: dang-ky-2.html
  // =========================
  const step2Form = document.getElementById("registerStep2Form");

  if (step2Form) {
    step2Form.addEventListener("submit", function (event) {
      event.preventDefault();

      const password = document.getElementById("reg-password").value.trim();
      const confirmPassword = document
        .getElementById("reg-confirm-password")
        .value.trim();

      const agreeCheckbox = document.getElementById("reg-agree");

      if (password === "") {
        alert("Vui lòng nhập mật khẩu!");
        return;
      }

      if (confirmPassword === "") {
        alert("Vui lòng nhập lại mật khẩu!");
        return;
      }

      if (password !== confirmPassword) {
        alert("Mật khẩu nhập lại không khớp!");
        return;
      }

      if (agreeCheckbox && !agreeCheckbox.checked) {
        alert("Vui lòng đồng ý với điều khoản trước khi đăng ký!");
        return;
      }

      const oldData = JSON.parse(localStorage.getItem(STORAGE_KEY));

      if (!oldData) {
        alert("Không tìm thấy thông tin đăng ký bước 1!");
        window.location.href = "dang-ky-1.html";
        return;
      }

      window.location.href = "dang-ky-thanh-cong.html";
    });
  }

  // =========================
  // TRANG ĐĂNG KÝ THÀNH CÔNG
  // File: dang-ky-thanh-cong.html
  // =========================
  const successFullName = document.getElementById("success-fullname");
  const successPhone = document.getElementById("success-phone");
  const successEmail = document.getElementById("success-email");

  if (successFullName && successPhone && successEmail) {
    const registerData = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (!registerData) {
      alert("Không tìm thấy thông tin đăng ký!");
      window.location.href = "dang-ky-1.html";
      return;
    }

    successFullName.textContent = registerData.fullName || "Chưa có thông tin";
    successPhone.textContent = registerData.phone || "Chưa có thông tin";
    successEmail.textContent = registerData.email || "Chưa có thông tin";
  }
});
