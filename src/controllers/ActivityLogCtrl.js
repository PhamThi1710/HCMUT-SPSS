const { errorMonitor } = require("events");
const fs = require("fs");

const ActivityLog = async (req, res) => {

    if(req.headers.cookie) {
        var cookies = req.headers.cookie.split(/\s*;\s*/);
        var id = cookies[0].split(/\s*=\s*/)[1];
        var token = cookies[1].split(/\s*=\s*/)[1];

        await fetch("http://127.0.0.1:3001/users/profile", {
            method: "GET",
            headers: {
                "Authorization": id + " " + token
            }
        }).then(async (result) => {
            const user = await result.json();
            res.render("ActivityLog", {
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
module.exports = {
    ActivityLog
}