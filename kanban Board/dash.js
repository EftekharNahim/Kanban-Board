var LogDash = document.querySelector("#Log-Dash-inf");
var Account = document.querySelector("#AccInf");
var Acc = document.querySelector("#acco");
var LogOut = document.querySelector("#LogOut");
console.log(Acc);
console.log("paici");
if (localStorage.getItem('DashUser')) {
    if (Account)
        Account.style.display = 'flex';
    if (LogDash)
        LogDash.style.display = 'none';
    var Username = localStorage.getItem('DashUser');
    console.log(Username);
    if (Username)
        Acc.innerText = JSON.parse(Username);
}
console.log(LogOut);
if (LogOut) {
    LogOut.addEventListener('click', function () {
        if (Account)
            Account.style.display = 'none';
        localStorage.removeItem('DashUser');
        LogDash.style.display = 'flex';
    });
}
//Add task part
var AddTask = document.querySelector("#AddTodo");
var todo = document.querySelector("todo");
if (AddTask) {
    AddTask.addEventListener('click', function () {
    });
}
