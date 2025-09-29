"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SignUpBtn = document.querySelector("#SignUp-btn");
const User = document.querySelector("#Username");
const mail = document.querySelector("#Mail");
const Pass = document.querySelector("#password");
const logForm = document.querySelector(".loginForm");
const Valid = document.querySelector("#validReg");
if (SignUpBtn) {
    SignUpBtn.addEventListener('click', () => {
        console.log('Button clicked!');
        console.log(User.value);
        let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (User.value === "") {
            Valid.innerText = "Please Enter your User Name";
        }
        else if (mail.value === "") {
            Valid.innerText = "Please Enter Your Email";
        }
        else if (!regex.test(mail.value)) {
            Valid.innerText = "Enter valid email";
        }
        else if (Pass.value === "") {
            Valid.innerText = "Please Enter a password";
        }
        else
        {
            const obj = {
                Username: User.value,
                Email: mail.value,
                Password:Pass.value

            }
        }

    });
}
//# sourceMappingURL=Regestration.js.map