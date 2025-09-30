var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
        if (LogDash)
            LogDash.style.display = 'flex';
    });
}
//Add task part
var AddTask = document.querySelector("#addTodo");
var todo = document.querySelector("#todo");
var form = document.querySelector("#form");
var Progress = document.querySelector("#Progress");
var Testing = document.querySelector("#Testing");
var Finished = document.querySelector("#Finished");
if (AddTask) {
    AddTask.addEventListener('click', function () {
        if (form)
            form.style.display = "block";
        AddTask.style.display = "none";
    });
}
function DeleteTask(id) {
    console.log("delete", id);
    var Data = JSON.parse(localStorage.getItem("TaskTodo") || "[]");
    var newData = Data.filter(function (task) { return task.id !== id; });
    localStorage.setItem("TaskTodo", JSON.stringify(newData));
    displayTask();
}
function MoveTask(id, newStatus) {
    console.log("move", id, "to", newStatus);
    var Data = JSON.parse(localStorage.getItem("TaskTodo") || "[]");
    var updated = Data.map(function (task) {
        return task.id === id ? __assign(__assign({}, task), { status: newStatus }) : task;
    });
    localStorage.setItem("TaskTodo", JSON.stringify(updated));
    displayTask();
}
function displayTask() {
    var Data = JSON.parse(localStorage.getItem("TaskTodo") || "[]");
    console.log(Data);
    if (todo) {
        todo.innerHTML = "";
        Data.forEach(function (item) {
            var card = document.createElement("div");
            card.className = "card m-2";
            // card.style.width = "18rem";
            card.innerHTML = "\n            <div class=\"card-body\" style=\"background-color: lightgrey; border:2px solid black;margin:5px; padding:5px;\">\n                <h5 class=\"card-title\">Title: ".concat(item.title, "</h5>\n                <h6 class=\"card-subtitle-to\">Assigned to: ").concat(item.Assign, "</h6>\n                <p class=\"card-text\">Description ").concat(item.description, "</p>\n                <div id=\"CngBtn\" style=\"display:flex; justify-content:space-between;\">\n                   <button onclick='DeleteTask(").concat(item.id, ")'>Delete</button>\n   <button onclick=\"MoveTask(").concat(item.id, ",'In Progress')\">Move to In Progress</button>\n   <button onclick='MoveTask(").concat(item.id, ", 'Testing')'>Move to Testing</button>\n   <button onclick='MoveTask(").concat(item.id, ", 'Finished')'>Move to Finished</button>\n                </div>\n                \n            </div>\n            ");
            if (item.status === 'To Do')
                todo.appendChild(card);
            else if (item.status === 'In Progress')
                Progress.appendChild(card);
            else if (item.status === 'Testing')
                Testing.appendChild(card);
            else if (item.status === 'Finished')
                Finished.appendChild(card);
        });
        if (AddTask)
            AddTask.style.display = "block";
    }
}
displayTask();
if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var title = document.querySelector("#Title").value;
        var description = document.querySelector("#Description").value;
        var Assign = document.querySelector("#Assign").value;
        var TaskData = {
            id: Date.now(),
            title: title,
            description: description,
            Assign: Assign,
            status: "To Do"
        };
        if (title.trim().length !== 0) {
            var Data = JSON.parse(localStorage.getItem("TaskTodo") || "[]");
            Data.push(TaskData);
            localStorage.setItem("TaskTodo", JSON.stringify(Data));
        }
        if (form)
            form.style.display = "none";
        if (AddTask)
            AddTask.style.display = "block";
        window.location.reload();
    });
}
window.DeleteTask = DeleteTask;
window.MoveTask = MoveTask;
