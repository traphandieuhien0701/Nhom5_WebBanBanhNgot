document.addEventListener("DOMContentLoaded", function () {
  /*
    STORAGE_KEY là tên khóa dùng để lưu dữ liệu đăng ký vào localStorage.

    localStorage:
    - Là nơi lưu dữ liệu tạm trên trình duyệt.
    - Khi chuyển từ trang đăng ký bước 1 sang bước 2,
      dữ liệu vẫn còn để dùng tiếp.
  */
  const STORAGE_KEY = "sweetCakeRegisterData";

  // =========================
  // ĐĂNG KÝ BƯỚC 1
  // File: dang-ky-1.html
  // Mục đích:
  // - Lấy họ tên, số điện thoại, email
  // - Kiểm tra người dùng có nhập đủ không
  // - Lưu dữ liệu vào localStorage
  // - Chuyển sang trang đăng ký bước 2
  // =========================

  // Lấy form đăng ký bước 1 theo id
  const step1Form = document.getElementById("registerStep1Form");

  /*
    Kiểm tra form bước 1 có tồn tại trên trang hiện tại không.
    Vì file JS này dùng chung cho nhiều trang:
    - dang-ky-1.html
    - dang-ky-2.html
    - dang-ky-thanh-cong.html

    Nếu đang ở trang khác thì step1Form sẽ không tồn tại.
  */
  if (step1Form) {
    // Bắt sự kiện khi người dùng bấm nút submit form
    step1Form.addEventListener("submit", function (event) {
      /*
        Ngăn form gửi dữ liệu theo cách mặc định của HTML.
        Nếu không có dòng này, trình duyệt có thể tự reload/chuyển trang.
      */
      event.preventDefault();

      // Lấy giá trị người dùng nhập vào, trim() để xóa khoảng trắng đầu/cuối
      const fullName = document.getElementById("reg-fullname").value.trim();
      const phone = document.getElementById("reg-phone").value.trim();
      const email = document.getElementById("reg-email").value.trim();

      // Kiểm tra họ tên có bị bỏ trống không
      if (fullName === "") {
        alert("Vui lòng nhập họ và tên!");
        return;
      }

      // Kiểm tra số điện thoại có bị bỏ trống không
      if (phone === "") {
        alert("Vui lòng nhập số điện thoại!");
        return;
      }

      // Kiểm tra email có bị bỏ trống không
      if (email === "") {
        alert("Vui lòng nhập email!");
        return;
      }

      /*
        Tạo object chứa thông tin đăng ký bước 1.
        Object này gồm:
        - fullName: họ tên
        - phone: số điện thoại
        - email: email
      */
      const registerData = {
        fullName: fullName,
        phone: phone,
        email: email,
      };

      /*
        Lưu dữ liệu vào localStorage.

        Vì localStorage chỉ lưu được dạng chuỗi,
        nên phải dùng JSON.stringify() để chuyển object thành chuỗi.
      */
      localStorage.setItem(STORAGE_KEY, JSON.stringify(registerData));

      // Chuyển sang trang đăng ký bước 2
      window.location.href = "dang-ky-2.html";
    });
  }

  // =========================
  // ĐĂNG KÝ BƯỚC 2
  // File: dang-ky-2.html
  // Mục đích:
  // - Lấy mật khẩu và nhập lại mật khẩu
  // - Kiểm tra mật khẩu có khớp không
  // - Kiểm tra người dùng đã đồng ý điều khoản chưa
  // - Nếu hợp lệ thì chuyển sang trang đăng ký thành công
  // =========================

  // Lấy form đăng ký bước 2 theo id
  const step2Form = document.getElementById("registerStep2Form");

  // Nếu form bước 2 tồn tại thì mới xử lý
  if (step2Form) {
    step2Form.addEventListener("submit", function (event) {
      // Ngăn form gửi mặc định
      event.preventDefault();

      // Lấy mật khẩu
      const password = document.getElementById("reg-password").value.trim();

      // Lấy mật khẩu nhập lại
      const confirmPassword = document
        .getElementById("reg-confirm-password")
        .value.trim();

      // Lấy checkbox đồng ý điều khoản
      const agreeCheckbox = document.getElementById("reg-agree");

      // Kiểm tra mật khẩu có bị bỏ trống không
      if (password === "") {
        alert("Vui lòng nhập mật khẩu!");
        return;
      }

      // Kiểm tra ô nhập lại mật khẩu có bị bỏ trống không
      if (confirmPassword === "") {
        alert("Vui lòng nhập lại mật khẩu!");
        return;
      }

      // Kiểm tra mật khẩu và nhập lại mật khẩu có giống nhau không
      if (password !== confirmPassword) {
        alert("Mật khẩu nhập lại không khớp!");
        return;
      }

      // Nếu có checkbox điều khoản nhưng người dùng chưa tick thì báo lỗi
      if (agreeCheckbox && !agreeCheckbox.checked) {
        alert("Vui lòng đồng ý với điều khoản trước khi đăng ký!");
        return;
      }

      /*
        Lấy lại dữ liệu đã lưu ở bước 1 từ localStorage.

        JSON.parse():
        - Chuyển chuỗi JSON trong localStorage về object JavaScript.
      */
      const oldData = JSON.parse(localStorage.getItem(STORAGE_KEY));

      /*
        Nếu không có dữ liệu bước 1,
        nghĩa là người dùng vào thẳng trang bước 2
        mà chưa nhập thông tin ở bước 1.
      */
      if (!oldData) {
        alert("Không tìm thấy thông tin đăng ký bước 1!");
        window.location.href = "dang-ky-1.html";
        return;
      }

      /*
        Vì website chỉ làm giao diện,
        nên không cần gửi dữ liệu lên backend/database.
        Nếu thông tin hợp lệ thì chuyển sang trang đăng ký thành công.
      */
      window.location.href = "dang-ky-thanh-cong.html";
    });
  }

  // =========================
  // TRANG ĐĂNG KÝ THÀNH CÔNG
  // File: dang-ky-thanh-cong.html
  // Mục đích:
  // - Lấy dữ liệu đã lưu ở bước 1
  // - Hiển thị họ tên, số điện thoại, email lên trang thành công
  // =========================

  // Lấy các vị trí hiển thị thông tin trên trang đăng ký thành công
  const successFullName = document.getElementById("success-fullname");
  const successPhone = document.getElementById("success-phone");
  const successEmail = document.getElementById("success-email");

  /*
    Chỉ xử lý khi cả 3 phần tử hiển thị đều tồn tại.
    Điều này giúp file JS không bị lỗi khi chạy ở trang khác.
  */
  if (successFullName && successPhone && successEmail) {
    // Lấy dữ liệu đăng ký từ localStorage
    const registerData = JSON.parse(localStorage.getItem(STORAGE_KEY));

    /*
      Nếu không tìm thấy dữ liệu,
      nghĩa là người dùng vào thẳng trang thành công
      mà chưa đăng ký từ bước 1.
    */
    if (!registerData) {
      alert("Không tìm thấy thông tin đăng ký!");
      window.location.href = "dang-ky-1.html";
      return;
    }

    /*
      Hiển thị dữ liệu lên giao diện.

      Nếu dữ liệu bị thiếu,
      thì hiển thị "Chưa có thông tin".
    */
    successFullName.textContent = registerData.fullName || "Chưa có thông tin";
    successPhone.textContent = registerData.phone || "Chưa có thông tin";
    successEmail.textContent = registerData.email || "Chưa có thông tin";
  }
});
