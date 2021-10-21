function submit() {
    var user = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var req = new XMLHttpRequest();
    req.open("POST", "https://azure-tender-judo.glitch.me/v1/auth", true);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.addEventListener("load", function() {
        console.log(req.status);
        console.log(req.responseType);
    });
    req.addEventListener("error", function () {
        console.log("Error occurred!");
      });
    var acc = {
        username: user,
        password: password,
    }
    req.send(JSON.stringify(acc));
    alert('done');
}