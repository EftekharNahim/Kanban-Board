var LogBtn = document.querySelector("#log-btn");
var Email = document.querySelector("#logEmail");
var Pass = document.querySelector("#logPass");
var Valid = document.querySelectorAll(".validLog");
if (LogBtn) {
    LogBtn.addEventListener('click', function () {
        var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        var passReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (Valid[0] && Valid[1]) {
            Valid[0].innerText = Valid[1].innerText = "";
        }
        if (Email.value === "") {
            if (Valid[0])
                Valid[0].innerText = "Please Enter Your Email";
        }
        else if (!regex.test(Email.value)) {
            if (Valid[0])
                Valid[0].innerText = "Enter valid email";
        }
        else if (Pass.value === "") {
            if (Valid[1])
                Valid[1].innerText = "Please Enter a password";
        }
        else if (!passReg.test(Pass.value)) {
            if (Valid[1])
                Valid[1].innerText = "Password must be contain uppercase,lowercase,number,special Character and atleast length 8";
        }
        else {
            if (localStorage.getItem(Email.value)) {
                var obj = localStorage.getItem(Email.value);
                if (obj) {
                    var Data = JSON.parse(obj);
                    if (Data.password === Pass.value) {
                        localStorage.setItem("DashUser", JSON.stringify(Data.user));
                        window.location.href = "Dashboard.html";
                    }
                }
            }
            else if (Valid[0])
                Valid[0].innerText = "This Email not Registered.";
        }
    });
}
