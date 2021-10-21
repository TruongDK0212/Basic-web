var req = new XMLHttpRequest();
req.open("GET", "https://zll4e.mocklab.io/v1/users", true);
req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
req.addEventListener("load", function() {
    console.log(req.status);
    var data1 = req.responseText;
    var data2 = data1.replace(/21\",/g, '21\"');
    var data3 = JSON.parse(data2);
    var data4 = data3.data.users;
    insertTable(data4);
});
req.addEventListener("error", function () {
    console.log("Error occurred!");
});
req.send(null);

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


