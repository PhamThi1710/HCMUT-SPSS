const { errorMonitor } = require("events");
const fs = require("fs");

const getUserInfo = async (req, res) => {

    if(req.headers.cookie) {
        var cookies = req.headers.cookie.split(/\s*;\s*/);
        var id = cookies[0].split(/\s*=\s*/)[1];
        var token = cookies[1].split(/\s*=\s*/)[1];

        try {
            const userId = req.params.userId;

            // Gửi yêu cầu GET đến API để lấy thông tin người dùng
            const response = await fetch(`http://127.0.0.1:3000/users/profile`, {
                method: 'GET',
                headers: {
                    "Authorization": id + " " + token
                }
            });

            if (!response.ok) {
                // Xử lý lỗi nếu cần
                res.status(response.status).send('Error fetching user info');
                return;
            }

            // Parse dữ liệu JSON từ phản hồi
            const userInfo = await response.json();

            // Render trang userInfo.html với thông tin người dùng
            res.render('userInfor', { userInfo });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
    else {
        res.render('logIn');
    }
};

const updateUserProfile = async (req, res) => {
    var cookies = req.headers.cookie.split(/\s*;\s*/);

    if(cookies.length > 0) {
        var id = cookies[0].split(/\s*=\s*/)[1];
        var token = cookies[1].split(/\s*=\s*/)[1];

        try {
            const userId = req.params.userId;
            const formData = new FormData();

            // Điều chỉnh để phản ánh thực tế của ứng dụng của bạn
            formData.append("body", JSON.stringify(req.body));

            // Điều chỉnh để phản ánh thực tế của ứng dụng của bạn
            formData.append("orderfile", req.files[0]);

            // Gửi yêu cầu POST đến API để cập nhật thông tin người dùng
            const response = await fetch(`http://127.0.0.1:3000/users/profile`, {
                method: 'POST',
                body: formData,
                headers: {
                    "Authorization": id + " " + token
                }
            });

            // Xóa tệp tạm sau khi gửi yêu cầu
            await fs.unlink(`./uploads/${req.files[0].filename}`);

            // Gửi kết quả trả về từ API về cho client
            res.send(response);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
    else {
        res.render('logIn');
    }
};

module.exports = {
    getUserInfo,
    updateUserProfile
};