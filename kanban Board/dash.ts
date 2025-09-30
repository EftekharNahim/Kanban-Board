const LogDash = document.querySelector("#Log-Dash-inf") as HTMLAnchorElement;
const Account = document.querySelector("#AccInf") as HTMLDivElement;
const Acc = document.querySelector("#acco") as HTMLParagraphElement;
const LogOut = document.querySelector("#LogOut") as HTMLAnchorElement;
console.log(Acc);
console.log("paici");
if (localStorage.getItem('DashUser'))
{
    if(Account)Account.style.display = 'flex';
    if(LogDash)LogDash.style.display = 'none';
    const Username = localStorage.getItem('DashUser');
    console.log(Username);
    if(Username)Acc.innerText = JSON.parse(Username);
}
console.log(LogOut);
if (LogOut) {
    LogOut.addEventListener('click', () => {
        if(Account)Account.style.display = 'none';
        localStorage.removeItem('DashUser');
        LogDash.style.display = 'flex';
    })
}

//Add task part
const AddTask = document.querySelector("#AddTodo") as HTMLDivElement;
const todo = document.querySelector("todo") as HTMLDivElement;

if(AddTask)
{
    AddTask.addEventListener('click', () => {
        
    })
}