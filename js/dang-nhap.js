document.addEventListener("DOMContentLoaded", function () {
  // Lấy form đăng nhập

  const loginForm = document.getElementById("loginForm");

  // Lấy ô nhập tên đăng nhập

  const usernameInput = document.getElementById("login-username");

  // Lấy ô nhập mật khẩu

  const passwordInput = document.getElementById("login-password");

  // Lấy checkbox ghi nhớ

  const rememberCheckbox = document.getElementById("remember-me");

  // Lấy vùng hiển thị thông báo

  const loginMessage = document.getElementById("loginMessage");

  /*

    Nếu trang hiện tại không có form đăng nhập,

    thì dừng code để tránh lỗi.

  */

  if (!loginForm) {
    return;
  }

  /*

    Lấy tên đăng nhập đã lưu trước đó.

    Nếu người dùng từng tick "Ghi nhớ",

    thì trình duyệt sẽ tự điền lại tên đăng nhập.

  */

  const rememberedUsername = localStorage.getItem(
    "sweetcake_remember_username",
  );

  if (rememberedUsername && usernameInput && rememberCheckbox) {
    usernameInput.value = rememberedUsername;

    rememberCheckbox.checked = true;
  }

  /*

    Bắt sự kiện khi người dùng bấm nút Đăng nhập.

  */

  loginForm.addEventListener("submit", function (event) {
    // Ngăn form gửi theo cách mặc định của HTML

    event.preventDefault();

    // Lấy giá trị người dùng nhập vào

    const username = usernameInput.value.trim();

    const password = passwordInput.value.trim();

    /*

      Kiểm tra tên đăng nhập có bị bỏ trống không.

    */

    if (username === "") {
      showMessage("Vui lòng nhập tên đăng nhập.", "error");

      usernameInput.focus();

      return;
    }

    /*

      Kiểm tra mật khẩu có bị bỏ trống không.

    */

    if (password === "") {
      showMessage("Vui lòng nhập mật khẩu.", "error");

      passwordInput.focus();

      return;
    }

    /*

      Vì website chỉ làm giao diện,

      nên không kiểm tra tài khoản trong database.

      Chỉ cần nhập đủ thông tin là cho chuyển sang trang hồ sơ.

    */

    if (rememberCheckbox && rememberCheckbox.checked) {
      localStorage.setItem("sweetcake_remember_username", username);
    } else {
      localStorage.removeItem("sweetcake_remember_username");
    }

    // Hiển thị thông báo đăng nhập thành công

    showMessage("Đăng nhập thành công! Đang chuyển sang hồ sơ...", "success");

    // Sau 0.8 giây thì chuyển sang trang hồ sơ

    setTimeout(function () {
      window.location.href = "ho-so.html";
    }, 800);
  });

  /*

    Hàm hiển thị thông báo.

    type có thể là:

    - success: thành công

    - error: lỗi

  */

  function showMessage(message, type) {
    if (!loginMessage) {
      alert(message);

      return;
    }

    loginMessage.textContent = message;

    loginMessage.classList.remove("success", "error");

    loginMessage.classList.add(type);
  }
});
