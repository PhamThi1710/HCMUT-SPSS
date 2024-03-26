window.addEventListener('load', (e) => {
    var no = 0;
    if(document.cookie) {
        var cookies;
        var id;
        var token;
        cookies = document.cookie.split(/\s*;\s*/);
        id = cookies[0].split(/\s*=\s*/)[1];
        token = cookies[1].split(/\s*=\s*/)[1];
    }

    var curprice = 10000;
    var remainPage = document.getElementById('pages-remain');
    var balance = document.getElementById('balance-remain');
    
    async function getRemainPage() {
        await fetch("http://127.0.0.1:3000/users/profile", {
            method: "GET",
            headers: {
                "Authorization": id + " " + token
            }
        }).then(async (res) => {
            user = await res.json();
            remainPage.innerHTML = user.pages;
            balance = user.balance;
        }).catch((err) => {
            console.log(err);
        });
        document.getElementById('page-price').innerHTML = curprice/40;
    }
    getRemainPage();

    var totalPage = 0;
    var pagetype = 1;
    var pagenum = 0;
    document.getElementById('page-type').addEventListener('change', (e) => {
        if(e.target.value == "A3") pagetype = 2;
        else if(e.target.value == "A4") pagetype = 1;
        totalPage = pagetype*pagenum;
    });

    document.getElementById('page-num').addEventListener('change', (e) => {
        pagenum = e.target.value;
        totalPage = pagetype*pagenum;
        if(totalPage <= 0) {
            document.getElementById('submitbtn').disabled = true;
        }
        else {
            document.getElementById('submitbtn').disabled = false;
        }
    });

    var form = document.getElementById('form');
    var bptable = document.getElementById('bptable');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        var amount = curprice*totalPage/40;
        var paidstt = 0;
        
        if(amount <= balance) {
            await commitPurchase(amount);
            paidstt = 1;
            location.reload();
        }
        else {
            window.alert("Not enough money!");
        }
    });    

    async function commitPurchase(amount) {
        var type = document.getElementById('page-type').value;
        var numpage = document.getElementById('page-num').value;
        var ex = 1;
        if(type == "A3") ex = 2;

        await fetch("http://127.0.0.1:3000/users/buypaper", {
            method: "POST",
            body: JSON.stringify({
                "number": numpage,
                "money": (curprice*numpage*ex)/40
            }),
            headers: {
                "Authorization": id + " " + token,
                "Content-Type": "application/json"
            }
        }).then((res) => {
            getRemainPage();
            form.reset();
        }).catch((err) => {
            console.log(err);
        });
        
    }

    async function pay(billID) {
        getRemainPage();
        const price = document.getElementById(billID).children[3].value;
        if(balance >= price) {
            await commitPurchase();
            const paid = document.getElementById(billID).children[4];
            paid.innerText = "Đã thanh toán";
            paid.style = "color: #000; font-weight: 500";
            const row = document.getElementById(billID);
            row.removeAttribute("id");
            row.removeAttribute("OnClick");
        }
        else
        {
            alert("Số tiền trong tài khoản không đủ để thanh toán!");
        }
    }
        
});