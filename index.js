try {
    requestCommon("GET", "users", null, function(status, res) {
        if (res) {
            const user = res.data.users;
            insertTable(user);
        } else {
            alert(status);
        }
    }) 
} catch (error) {
    console.log("error");
}

function insertTable(x) {
    var table = document.getElementById('addData');
    var s = '';
    x.map(i => {
        s += `<tr>
            <td>${i.id}</td>
            <td>${i.firstName}</td>
            <td>${i.lastName}</td>
            <td>${i.email}</td>
            </tr>`;
    });
    table.innerHTML = s;
}
function checkLogin() {
    if (window.localStorage.getItem('is_login') == 'false') {
        window.location.href = "login.html";
    }
}
