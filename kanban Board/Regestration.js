"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SignUpBtn = document.querySelector("#SignUp-btn");
const User = document.querySelector("#Username");
const mail = document.querySelector("#Mail");
const Pass = document.querySelector("#password");
const logForm = document.querySelector(".loginForm");
const Valid = document.querySelectorAll(".validReg");
if (SignUpBtn) {
    SignUpBtn.addEventListener('click', () => {
        console.log('Button clicked!');
        console.log(User.value);
        let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        let passReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (Valid[0] && Valid[1] && Valid[2]) {
            Valid[0].innerText = Valid[1].innerText = Valid[2].innerText = "";
        }
        if (User.value === "") {
            if (Valid[0])
                Valid[0].innerText = "Please Enter your User Name";
        }
        else if (mail.value === "") {
            if (Valid[1])
                Valid[1].innerText = "Please Enter Your Email";
        }
        else if (!regex.test(mail.value)) {
            if (Valid[1])
                Valid[1].innerText = "Enter valid email";
        }
        else if (Pass.value === "") {
            if (Valid[2])
                Valid[2].innerText = "Please Enter a password";
        }
        else if (!passReg.test(Pass.value)) {
            if (Valid[2])
                Valid[2].innerText = "Password must be contain uppercase,lowercase,number,special Character and atleast length 8";
        }
        else {
            const obj = {
                user: User.value,
                email: mail.value,
                password: Pass.value
            };
            if (localStorage.getItem(mail.value)) {
                if (Valid[1])
                    Valid[1].innerText = "This Email Already Registerd";
            }
            else
                localStorage.setItem(mail.value, JSON.stringify(obj));
        }
    });
}
//# sourceMappingURL=Regestration.js.map