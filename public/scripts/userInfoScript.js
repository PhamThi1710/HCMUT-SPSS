var cookies;
var id;
var token;

if(document.cookie) {
    cookies = document.cookie.split(/\s*;\s*/);
    id = cookies[0].split(/\s*=\s*/)[1];
    token = cookies[1].split(/\s*=\s*/)[1];
}

async function getUserInfo() {
    var user_name = document.getElementById('student-inf.name');
    if(user_name.innerHTML.length > 0) return;
    var user_id = document.getElementById('student-inf.MSSV');
    var user_balance = document.getElementById('student-inf.balance');
    var user_pages = document.getElementById('student-inf.pages');
    var user_phone = document.getElementById('student-inf.phone');
    var user_birthdate = document.getElementById('student-inf.birthday');

    await fetch("http://127.0.0.1:3001/users/profile", {
        method: "GET",
        headers: {
            "Authorization": id + " " + token
        }
    }).then(async (res) => {
        user = await res.json();
        user_name.innerHTML = user.name;
        user_id.innerHTML = user.studentid;
        user_balance.innerHTML = user.balance;
        user_pages.innerHTML = user.pages;
        user_phone.innerHTML = user.Phone;
        
        var birthday = new Date(user.Birthday);
        var formattedDate = birthday.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        user_birthdate.innerHTML = formattedDate;
    }).catch((err) => {
        console.log(err);
    });
};
getUserInfo();
