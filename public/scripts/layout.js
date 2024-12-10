window.addEventListener('load', (e) => {

    document.getElementById('logout').addEventListener("click", function () {
        // document.getElementById('logout_popup').classList.add("open-popup");
        document.getElementById('logout_popup').style.display = "block";
    });
    document.getElementById('del').addEventListener("click", function () {
        // document.getElementById('logout_popup').classList.remove("open-popup");
        document.getElementById('logout_popup').style.display = "none";
    });
    document.getElementById('out').addEventListener('click', function(e) {
        document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = '/';
    });
});

if(document.cookie.length > 0) {
    var cookies = document.cookie.split(/\s*;\s*/);
    var id = cookies[0].split(/\s*=\s*/)[1];
    var token = cookies[1].split(/\s*=\s*/)[1];
}
else {
    document.getElementsByClassName("right")[0].style.display = "none";
    document.getElementsByClassName("middle")[0].style.display = "none";
}

async function getUser() {

    var user_inf = document.getElementById('student-inf');
    if (user_inf.innerHTML.length > 0) return;
    await fetch("http://127.0.0.1:3001/users/profile", {
        method: "GET",
        headers: {
            "Authorization": id + " " + token
        }
    }).then(async (res) => {
        user = await res.json();
        user_inf.innerHTML = user.name + "<br>" + user.studentid;
        
        // var pageleft = user.pages;
        // getTotalPage(pageleft);
    }).catch((err) => {
        console.log(err);
    });
};
if(document.cookie.length > 0) {
    getUser();
}