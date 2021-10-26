function onSubmit() {
    try {
        // var user = document.getElementById('user').value;
        // var password = document.getElementById('password').value;
        var user = $('#user');
        var password = $('#password');
        var acc = {
            username: user,
            password: password,
        }
        requestCommon("POST", "auth", acc, function(status, text) {
            console.log('output ', status, text);
            setStatusLogin(status);
            redirectPage();
        });
    } catch (error) {
        console.log(error);
    }
}

function setStatusLogin(status) {
    if (status == 200) {
        window.localStorage.setItem('is_login', 'true');
    } else {
        window.localStorage.setItem('is_login', 'false');
    }
}

function redirectPage() {
    if (window.localStorage.getItem('is_login') == 'true') {
        window.location.href = "index.html";
    }
}


