// =========================================================
// FILE: dang-nhap.js
// MỤC ĐÍCH:
// - Kiểm tra đăng nhập.
// - Lưu thông tin người dùng vào localStorage.
// - Ghi nhớ tên đăng nhập nếu người dùng tick "Ghi nhớ".
// - Đăng nhập thành công chuyển sang ho-so.html.
// =========================================================

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("login-username");
  const passwordInput = document.getElementById("login-password");
  const rememberCheckbox = document.getElementById("remember-me");
  const loginMessage = document.getElementById("loginMessage");

  if (!loginForm) {
    return;
  }

  const demoUsers = [
    {
      username: "hien",
      password: "123456",
      name: "Trà Phan Diệu Hiền",
      email: "hien@gmail.com",
      phone: "0123456789",
      role: "customer",
    },
    {
      username: "nguyena",
      password: "123456",
      name: "Nguyễn A",
      email: "abc@gmail.com",
      phone: "0312222222",
      role: "customer",
    },
  ];

  const rememberedUsername = localStorage.getItem(
    "sweetcake_remember_username",
  );

  if (rememberedUsername && usernameInput && rememberCheckbox) {
    usernameInput.value = rememberedUsername;
    rememberCheckbox.checked = true;
  }

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (username === "") {
      showMessage("Vui lòng nhập tên đăng nhập.", "error");
      usernameInput.focus();
      return;
    }

    if (password === "") {
      showMessage("Vui lòng nhập mật khẩu.", "error");
      passwordInput.focus();
      return;
    }

    const foundUser = demoUsers.find(function (user) {
      return user.username === username && user.password === password;
    });

    if (!foundUser) {
      showMessage("Tên đăng nhập hoặc mật khẩu không đúng.", "error");
      return;
    }

    const currentUser = {
      username: foundUser.username,
      name: foundUser.name,
      email: foundUser.email,
      phone: foundUser.phone,
      role: foundUser.role,
      isLoggedIn: true,
    };

    localStorage.setItem("sweetcake_current_user", JSON.stringify(currentUser));

    if (rememberCheckbox && rememberCheckbox.checked) {
      localStorage.setItem("sweetcake_remember_username", username);
    } else {
      localStorage.removeItem("sweetcake_remember_username");
    }

    showMessage("Đăng nhập thành công! Đang chuyển sang hồ sơ...", "success");

    setTimeout(function () {
      window.location.href = "ho-so.html";
    }, 800);
  });

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
