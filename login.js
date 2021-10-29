function onSubmit() {
    debugger
    try {
        var user = $('#user');
        var password = $('#password');  
        var acc = {
            username: user.val(),
            password: password.val()
        }
        var url = "https://zll4e.mocklab.io/v1/auth";
        var xhr = new XMLHttpRequest();

        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.onload = function () {
            var res = xhr.responseText
            setStatusLogin(res);
            redirectPage();
        }
        xhr.send(JSON.stringify(acc));
    } catch (error) {
        console.log(error);
    }
}

// Không cho phép về trang đăng nhập nếu ko log out
function checkAuth() {
    redirectPage();
}

// Kiểm tra trạng thái đăng nhập
function setStatusLogin(res) {
    if (res.indexOf("token") >= 0) {
        window.localStorage.setItem('is_login', 'true');
    } else {
        document.querySelector('.warntext').style.display = "inline-block";
        window.localStorage.setItem('is_login', 'false');
    }
}

// Chuyển hướng trang nếu đã đăng nhập thành công
function redirectPage() {
    if (window.localStorage.getItem('is_login') == 'true') {
        window.location.href = "index.html";
    }
}

// Hiển thị mật khẩu
function myFunction() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
}



