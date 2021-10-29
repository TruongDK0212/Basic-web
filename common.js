// Hàm giao tiếp chung với API qua XHR
function requestCommon(method, api_path, data, callback) {
    try {
        var req = new XMLHttpRequest();
        req.open(method, "https://zll4e.mocklab.io/v1/" + api_path, true);
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.addEventListener("load", function () {
            if (req.status == 200) {
                callback(req.status, req.responseText); 
            } else {
                callback(req.status)
            }
        });
        req.addEventListener("error", function () {
            console.log("Error occurred!");
        });
        req.send(data ? JSON.stringify(data) : data);      
    } catch (error) {
        console.log("error", error);
    }
}

// Chỉnh sửa dữ liệu nhận từ Server
function parseJSON(text) {
    if (!text) {
        return ;
    }
    text = text
        .replace(/\n|\r\|\t/gi, '')
        .replace(/"dateAdded": "(.*?)",/gi, '"dateAdded": "$1"');
    text = JSON.parse(text);
    return text;
}