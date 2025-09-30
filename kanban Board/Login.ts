const LogBtn = document.querySelector("#log-btn") as HTMLButtonElement;
const Email = document.querySelector("#logEmail") as HTMLInputElement;
const Pass = document.querySelector("#logPass") as HTMLInputElement
const Valid = document.querySelectorAll(".validLog") as NodeListOf<HTMLDivElement>;


type RegObj = {
    user: string,
    email: string,
    password: string
}

if (LogBtn) {
    LogBtn.addEventListener('click', () => {
       
        let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        let passReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (Valid[0] && Valid[1]) {
            Valid[0].innerText = Valid[1].innerText = "";
        }
        if (Email.value === "") {
            if (Valid[0]) Valid[0].innerText = "Please Enter Your Email";

        }
        else if (!regex.test(Email.value)) {
            if (Valid[0]) Valid[0].innerText = "Enter valid email";

        }
        else if (Pass.value === "") {
            if (Valid[1]) Valid[1].innerText = "Please Enter a password";

        }
        else if (!passReg.test(Pass.value)) {
            if (Valid[1]) Valid[1].innerText = "Password must be contain uppercase,lowercase,number,special Character and atleast length 8";
        }
        else {
            if (localStorage.getItem(Email.value)) {
                const obj = localStorage.getItem(Email.value);
                if (obj) {
                    const Data: RegObj = JSON.parse(obj);
                    if (Data.password === Pass.value) {
                        localStorage.setItem("DashUser", JSON.stringify(Data.user));
                        window.location.href="Dashboard.html";
                    }
                }
            }
            else if (Valid[0]) Valid[0].innerText = "This Email not Registered.";
        }
    });
}

