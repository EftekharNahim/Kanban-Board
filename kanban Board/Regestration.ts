const SignUpBtn = document.querySelector("#SignUp-btn") as HTMLButtonElement;
const User = document.querySelector("#Username") as HTMLInputElement;
const mail = document.querySelector("#Mail") as HTMLInputElement;
const Pass = document.querySelector("#password") as HTMLInputElement;
const logForm = document.querySelector(".loginForm") as HTMLDivElement;
const Valid = document.querySelectorAll(".validReg") as NodeListOf<HTMLDivElement>;
type RegObj = {
    user: string,
    email: string,
    password: string
}

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
            if (Valid[0]) Valid[0].innerText = "Please Enter your User Name";


        }
        else if (mail.value === "") {
            if (Valid[1]) Valid[1].innerText = "Please Enter Your Email";

        }
        else if (!regex.test(mail.value)) {
            if (Valid[1]) Valid[1].innerText = "Enter valid email";

        }
        else if (Pass.value === "") {
            if (Valid[2]) Valid[2].innerText = "Please Enter a password";

        }
        else if (!passReg.test(Pass.value)) {
            if (Valid[2]) Valid[2].innerText = "Password must be contain uppercase,lowercase,number,special Character and atleast length 8";
        }
        else {
            const obj: RegObj = {
                user: User.value,
                email: mail.value,
                password: Pass.value
            }
            if (localStorage.getItem(mail.value)) {
                if (Valid[1]) Valid[1].innerText = "This Email Already Registerd";
            }
            else localStorage.setItem(mail.value, JSON.stringify(obj));
        }
    });
}




