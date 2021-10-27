try {
    requestCommon("GET", "users", null, function (status, res) {
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

var i = 0;  // id cho từng user trong bảng
function insertTable(x) {
    var table = document.getElementById('addData');
    var s = '';
    x.map( e => {
        s += `<tr class="user_${i}">
            <td>${e.id}</td>
            <td>${e.firstName}</td>
            <td>${e.lastName}</td>
            <td>${e.email}</td>
            <td><button type="button" class="btn btn-danger" onClick="removeUser('${e.id}', ${i})">Delete</button>
            <button type="button" class="btn btn-primary" onClick="editUser('${e.id}', '${e.firstName}', '${e.lastName}', '${e.email}')" data-toggle="modal" data-target="#formEdit">Edit</button>
            </td>
            </tr>`;
        i++;
    });
    table.innerHTML = s;
}
function checkLogin() {
    if (window.localStorage.getItem('is_login') == 'false') {
        window.location.href = "login.html";
    }
}


 // Xóa người dùng khỏi danh sách
function removeUser(id_user, i) {
    // Xóa dữ liệu ng dùng trên server
    requestCommon("DELETE", "users/" + id_user, null, function (status, res) {
        alert(res.data.message +" "+ status);
    });

    // Xóa dữ liệu người dùng trên bảng
    var userAccount = document.querySelector('.user_'+i);
    if (userAccount) {
        userAccount.remove();
    }
}


function addUser() {
    var id = document.getElementById('id').value;
    var first_name = document.getElementById('fn').value;
    var last_name = document.getElementById('ln').value;
    var email = document.getElementById('email').value;

    var data = {
        id: id,
        firstName: first_name,
        lastName: last_name,
        email: email
    }

    var s = '';
    s += `<tr class="user_${i}">
        <td>`+id+`</td>
        <td>`+first_name+`</td>
        <td>`+last_name+`</td>
        <td>`+email+`</td>
        <td><button type="button" class="btn btn-danger" onClick="removeUser('${id}', ${i})">Delete</button>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#formEdit">Edit</button>
        </td>
        </tr>`;
    i++;
    document.getElementById('addData').innerHTML += s;

    requestCommon ("POST", "users", data, function(stt) {
        alert('Trạng thái add thêm: '+ stt);
    })
}


// Hiển thị thông tin người dùng ra bảng sửa
function editUser(id, fn , ln, email) {
    document.getElementById('edit_id').value=id;
    document.getElementById('edit_fn').value=fn;
    document.getElementById('edit_ln').value=ln;
    document.getElementById('edit_email').value=email;
}

// Lưu lại dữ liệu đã thay đổi
// function saveChange(user_id) {
//     var userInfor = {

//     }
//     requestCommon("PUT", "users"+user_id, )
// }