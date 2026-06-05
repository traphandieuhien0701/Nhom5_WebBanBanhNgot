document.getElementById("loginForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    const username =
        document.getElementById("username").value;

    const password =
        document.getElementById("password").value;

    if(username === "admin" &&
       password === "123456"){

        window.location.href = "Dashboard.html";
    }
    else{

        document.getElementById("error-message")
        .innerText =
        "Tên đăng nhập hoặc mật khẩu không đúng!";
    }
});