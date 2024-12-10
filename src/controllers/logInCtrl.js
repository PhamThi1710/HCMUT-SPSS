const { json, response } = require("express");

const login = (req, res) => {
    res.render('logIn');
}

const verify = async (req, res) => {
    await fetch("http://127.0.0.1:3001/users/login", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
    })
    .then(async (response) => {
        var t = await response.json();
        if(t.error) {
            res.redirect('/login');
        }
        else {
            res.setHeader('Set-Cookie', [ 'id=' + t.id, 'token=' + t.token]);
            res.redirect('/');
        }
    })
    .catch((err) => {
        console.log(err);
    });
}

module.exports = {
    login,
    verify
}