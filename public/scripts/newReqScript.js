window.addEventListener('load', (e) => {
    var file_name = document.getElementById("file-name");
    const form = document.getElementById("form");
    var max_page = document.getElementsByClassName('total-page')[0].children[0].innerHTML;
    var result = document.getElementsByClassName('remain')[0].children[0];
    result.innerHTML = max_page;
    var ov_page = document.getElementById('page-number');

    var mul = 0;
    var cpy = 1;
    var pages = 0;
    var fr = 0;
    var to = 0;
    var ovpage = 1;

    document.getElementById("reset").addEventListener("click", (e) => {
        max_page = document.getElementsByClassName('total-page')[0].children[0].innerHTML;
        mul = 0;
        cpy = 1;
        pages = 0;
        fr = 0;
        to = 0;
        ovpage = 1;
        result.innerHTML = max_page;
        file_name.innerHTML = "Your file here";
    });

    document.getElementById("file-upload").addEventListener("change", (e) => {
        file_name.innerHTML = e.target.value.slice(12);
    });

    // document.getElementById('page-print').addEventListener('change', );
    document.getElementById('page-type').addEventListener('change', (e) => {
        if(e.target.value == 'A3') mul = 2;
        else if(e.target.value == 'A4') mul = 1;
        result.innerHTML = Math.floor(max_page - mul*cpy*pages/ovpage);
        checkRes();
    });

    var inp = document.querySelectorAll('input[name="page-range"]');
    for(var i = 0; i < inp.length; ++i) {
        inp[i].addEventListener('change', (e) => {
            var dis = document.getElementById('distance');
            switch (e.target.value) {
                case 'current page':
                case 'current view':
                    dis.style.display = "none";
                    pages = 1;
                    break;
                case 'all page':
                    dis.style.display = "none";
                    pages = 10;
                    break;
                case 'select page':
                    dis.style.display = "block";
                    pages = to - fr;
                    break;
                default:
                    dis.style.display = "none";
                    break;
            }
            result.innerHTML = Math.floor(max_page - mul*cpy*pages/ovpage);
            checkRes();
        });
    }
    document.getElementById("from").addEventListener("change", (e) => {
        fr = e.target.value;
        pages = to - fr;
        result.innerHTML = Math.floor(max_page - mul*cpy*pages/ovpage);
        checkRes();
    });
    document.getElementById("to").addEventListener("change", (e) => {
        to = e.target.value;
        pages = to - fr;
        result.innerHTML = Math.floor(max_page - mul*cpy*pages/ovpage);
        checkRes();
    });

    document.getElementById("page-number").addEventListener("change", (e) => {
        switch (ov_page.value) {
            case 'all':
                ovpage = 1;
                break;
            case 'odd':
            case 'eve':
                ovpage = 2;
                break;
            default:
                ovpage = 1;
                break;
        }
        result.innerHTML = Math.floor(max_page - mul*cpy*pages/ovpage);
        checkRes();
    });

    document.getElementById('number_copies').addEventListener('change', (e) => {
        cpy = e.target.value;
        result.innerHTML = Math.floor(max_page - mul*cpy*pages/ovpage);
        checkRes();
    });
    
    var cookies = document.cookie.split(/\s*;\s*/);
    var id = cookies[0].split(/\s*=\s*/)[1];
    var token = cookies[1].split(/\s*=\s*/)[1];

    form.addEventListener("submit", submitForm);
    async function submitForm(e) {
        e.preventDefault();

        // check data before send to server
        var check_res = checkForm();
        if(check_res == false) return;

        const formData = new FormData();

        formData.append("size", check_res.page_type);
        formData.append("numberofpages", max_page - result.innerHTML);
        formData.append("orderfile", check_res.files.files[0]);
        formData.append("numcopies", check_res.number_copies);
        formData.append("numsides", check_res.page_print);

        await fetch("http://127.0.0.1:3000/order/printing", {
            method: "POST",
            body: formData,
            headers: {
                "Authorization": id + " " + token
            }
        }).then((res) => {
            location.reload();
        }).catch((err) => {
            console.log(err);
        });
    }

    function checkForm() {
        // check file
        const files = document.getElementById("file-upload");
        if(!files.value) return false;

        // page print
        const page_print = document.getElementById('page-print');
        if(page_print.value == "0") return false;

        // page type
        const page_type = document.getElementById('page-type');
        if(page_type.value == '0') return false;

        // check number of pages
        var number_page = document.querySelector('input[name="page-range"]:checked');
        if(!number_page) return false;

        // check odd or even -----

        // check printer
        var printer = document.getElementById("printer");
        if(printer.value == "0") return false;

        // number of copies
        var number_copies = document.getElementById('number_copies').value;

        return {
            "files": files,
            "page_print": page_print.value,
            "page_type": page_type.value,
            "number_pages": number_page,
            "printer": printer.value,
            "number_copies": number_copies
        };
    }

    function checkRes() {
        if(result.innerHTML < 0) {
            document.getElementById("submit-btn").disabled = true;
        }
        else {
            document.getElementById("submit-btn").disabled = false;
        }
    }
});