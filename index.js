// Lấy danh sách người dùng từ API
try {
    requestCommon("GET", "users", null, function (status, res) {
        if (res) {
            const user = parseJSON(res).data.users;
            insertTable(user);
        } else {
            alert(status);
        }
    })
} catch (error) {
    console.log("error");
}

var i = 0;  // id cho từng user trong bảng

// Thể hiện danh sách người dùng ra bảng
function insertTable(x) {
    var table = document.getElementById('addData');
    var s = '';
    x.map( e => {
        s += `<tr class="user_${i}">
            <td>${e.id}</td>
            <td>${e.firstName}</td>
            <td>${e.lastName}</td>
            <td>${e.email}</td>
            <td><button type="button" class="btn btn-danger" data-toggle="modal" data-target="#deleteDone" onClick="removeUser('${e.id}', ${i})"><i class="material-icons" title="Delete">&#xE872;</i></button>
            <button type="button" class="btn btn-success" onClick="editUser('${e.id}', '${e.firstName}', '${e.lastName}', '${e.email}', ${i})" data-toggle="modal" data-target="#formEdit"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></button>
            </td>
            </tr>`;
        i++;
    });
    table.innerHTML = s;
}

// Kiểm tra trạng thái đăng nhập
function checkLogin() {
    if (window.localStorage.getItem('is_login') == 'false') {
        window.location.href = "login.html";
    }
}

// var rs;
// function continueDelete() {
//     var result = comfirm("Are you sure?");
//     rs = result;
// }
//  // Xóa người dùng khỏi danh sách
// function removeUser(id_user, i) {
//     if (rs) {
//         // Xóa dữ liệu ng dùng trên server
//         requestCommon("DELETE", "users/" + id_user, null, function (status, res) {
            
//         });
    
//         // Xóa dữ liệu người dùng trên bảng
//         var userAccount = document.querySelector('.user_'+i);
//         if (userAccount) {
//             userAccount.remove();
//         }
//         checkDelete = 0;
//     } else {
//         return;
//     }
// }


// Xóa người dùng khỏi danh sách
var i_continue;
var id_continue;

function removeUser(id_user, i) {
    i_continue = i;
    id_continue = id_user;
}
function continueDelete() {
    // Xóa dữ liệu ng dùng trên server
    requestCommon("DELETE", "users/" + id_continue, null, function (status, res) {
        
    });

    // Xóa dữ liệu người dùng trên bảng
    var userAccount = document.querySelector('.user_'+i_continue);
    if (userAccount) {
        userAccount.remove();
    }
}

// Thêm mới người dùng
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
        <td><button type="button" class="btn btn-danger" data-toggle="modal" data-target="#deleteDone" onClick="removeUser('${id}', ${i})"><i class="material-icons" title="Delete">&#xE872;</i></button>
        <button type="button" class="btn btn-success" data-toggle="modal" data-target="#formEdit" onClick="editUser('${id}', '${first_name}', '${last_name}', '${email}', ${i})"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></button>
        </td>
        </tr>`;
    i++;
    // document.getElementById('addData').innerHTML += s;
    $(s).insertBefore('table > tbody > tr:first');

    requestCommon ("POST", "users", data, function(stt) {
        
    })
}


// Hiển thị thông tin người dùng ra bảng sửa
var current_i;
function editUser(id, fn , ln, email, i) {
    document.getElementById('edit_id').value=id;
    document.getElementById('edit_fn').value=fn;
    document.getElementById('edit_ln').value=ln;
    document.getElementById('edit_email').value=email;
    current_i = i;
}

// Lưu lại dữ liệu đã thay đổi
function saveChange(user_id) {
    var userInfor = {
        id: document.getElementById('edit_id').value,
        firstName: document.getElementById('edit_fn').value,
        lastName: document.getElementById('edit_ln').value,
        email: document.getElementById('edit_email').value
    }
    requestCommon("PUT", "users/"+user_id, userInfor, function (status, res) {
        
    })

    var newRow =`<tr class="user_${current_i}">
    <td>`+document.getElementById('edit_id').value+`</td>
    <td>`+document.getElementById('edit_fn').value+`</td>
    <td>`+document.getElementById('edit_ln').value+`</td>
    <td>`+document.getElementById('edit_email').value+`</td>
    <td><button type="button" class="btn btn-danger" data-toggle="modal" onClick="removeUser('${userInfor.id}', ${current_i})" data-target="#deleteDone"><i class="material-icons" title="Delete">&#xE872;</i></button>
    <button type="button" class="btn btn-success" onClick="editUser('${userInfor.id}', '${userInfor.firstName}', '${userInfor.lastName}', '${userInfor.email}', ${current_i})" data-toggle="modal" data-target="#formEdit"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></button>
    </td>
    </tr>`;
    $('tr.user_'+current_i).replaceWith(newRow);
}

// Thoát trang trở về trang đăng nhập
function logout() {
    window.localStorage.setItem('is_login', 'false');
    checkLogin();
}