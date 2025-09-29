const SignUpBtn = document.querySelector("#SignUp-btn") as HTMLButtonElement;
const User = document.querySelector("#Username") as HTMLInputElement;
const Email = document.querySelector("#Mail") as HTMLInputElement;
const Pass = document.querySelector("#password") as HTMLInputElement;
const logForm = document.querySelector(".loginForm");
const Valid = document.querySelector("#validReg") as HTMLDivElement;

    if (SignUpBtn) { 
        SignUpBtn.addEventListener('click', () => {
            console.log('Button clicked!');
            console.log(User.value);
            if (User.value === "") {
                Valid.innerText = "Please Enter your User Name";
            }
            else if (Email.value === "")
            {
                Valid.innerText = "Please Enter Your Email";
            }
            else if (Pass.value == "")
            {
                Valid.innerText = "Please Enter a password";
            }
        });
    }




