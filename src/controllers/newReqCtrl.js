const { errorMonitor } = require("events");
const fs = require("fs");

const newReq = async (req, res) => {

    if(req.headers.cookie) {
        var cookies = req.headers.cookie.split(/\s*;\s*/);
        var id = cookies[0].split(/\s*=\s*/)[1];
        var token = cookies[1].split(/\s*=\s*/)[1];
        
        await fetch("http://127.0.0.1:3000/users/profile", {
            method: "GET",
            headers: {
                "Authorization": id + " " + token
            }
        }).then(async (result) => {
            const user = await result.json();
            res.render("newReq", {
                "request": req,
                "user": user
            });
        }).catch((err) => {
            console.log(err);
        });
    }
    else {
        res.redirect('logIn');
    }
}

const newPostReq = async (req, res) => {
    // console.log(req);
    // const formData = new FormData();
    // formData.append("body", req.body);
    // formData.append("orderfile", req.files[0]);

    // const result = await fetch("http://127.0.0.1:3000/order/printing", {
    //     method: "POST",
    //     body: formData,
    //     headers: {
    //         "Authorization": "655487f17a305c1ebe99a11f eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5lc3RreW84MkBnbWFpbC5jb20iLCJfaWQiOiI2NTU0ODdmMTdhMzA1YzFlYmU5OWExMWYiLCJzdHVkZW50aWQiOiIxMjM0NTYiLCJpYXQiOjE3MDEwNTYzMDYsImV4cCI6MTcwMTY2MTEwNn0.DCvYwayx02isHa22uwYUmW17fFr9tKFkWfFp0JJv89w"
    //     }
    // }).then((response) => {
    //     fs.unlink('./uploads/' + req.files[0].filename, (err) => {
    //         if(err) {
    //             console.log(err);
    //         }
    //     });
    //     res.send(response);
    // }).catch((error) => {
    //     console.log(error)
    //     res.send(error);
    // });
}

module.exports = {
    newReq,
    newPostReq
}