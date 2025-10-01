const LogDash = document.querySelector("#Log-Dash-inf") as HTMLAnchorElement;
const Account = document.querySelector("#AccInf") as HTMLDivElement;
const Acc = document.querySelector("#acco") as HTMLParagraphElement;
const LogOut = document.querySelector("#LogOut") as HTMLAnchorElement;
console.log(Acc);
console.log("paici");
if (localStorage.getItem('DashUser')) {
    if (Account) Account.style.display = 'flex';
    if (LogDash) LogDash.style.display = 'none';
    const Username = localStorage.getItem('DashUser');
    console.log(Username);
    if (Username) Acc.innerText = JSON.parse(Username);
}
console.log(LogOut);
if (LogOut) {
    LogOut.addEventListener('click', () => {
        if (Account) Account.style.display = 'none';
        localStorage.removeItem('DashUser');
        if (LogDash) LogDash.style.display = 'flex';
    })
}

//Add task part
const AddTask = document.querySelector("#addTodo") as HTMLButtonElement;
const todo = document.querySelector("#todo") as HTMLDivElement;
const form = document.querySelector("#form") as HTMLFormElement;
const Progress = document.querySelector("#Progress") as HTMLDivElement;
const Testing = document.querySelector("#Testing") as HTMLDivElement;
const Finished = document.querySelector("#Finished") as HTMLDivElement;
type Status = "To Do" | "In Progress" | "Testing" | "Finished";

if (AddTask) {
    AddTask.addEventListener('click', () => {
        if (form) form.style.display = "block";
        AddTask.style.display = "none";
    })
}
function DeleteTask(id: number) {
    console.log("delete", id);
    const Data = JSON.parse(localStorage.getItem("TaskTodo") || "[]");
    const newData = Data.filter((task: { id: number }) => task.id !== id);
    localStorage.setItem("TaskTodo", JSON.stringify(newData));
    displayTask();
}
function MoveTask(id: number, newStatus: Status) {
    console.log("move", id, "to", newStatus);
    const Data = JSON.parse(localStorage.getItem("TaskTodo") || "[]");
    const updated = Data.map((task: { id: number, status: Status }) =>
        task.id === id ? { ...task, status: newStatus } : task
    );
    localStorage.setItem("TaskTodo", JSON.stringify(updated));
    displayTask();
}


function displayTask() {
    const Data = JSON.parse(localStorage.getItem("TaskTodo") || "[]");
    console.log(Data);
    if (todo) {
        todo.innerHTML = "";
         Progress.innerHTML = "";
        Testing.innerHTML = "";
        Finished.innerHTML = "";
        Data.forEach((item: { id: number, title: string, description: string, Assign: string, status: Status }) => {
            const card = document.createElement("div");
            card.className = "card m-2";
            // card.style.width = "18rem";
            card.innerHTML = `
            <div class="card-body" style="background-color: lightgrey; border:2px solid black;margin:5px; padding:5px;">
                <h5 class="card-title">Title: ${item.title}</h5>
                <h6 class="card-subtitle-to">Assigned to: ${item.Assign}</h6>
                <p class="card-text">Description ${item.description}</p>
                <div id="CngBtn" style="display:flex; justify-content:space-between;">
                   <button onclick='DeleteTask(${item.id})'>Delete</button>
              ${item.status !== 'To Do' ? `<button onclick="MoveTask(${item.id},'To Do')">Move to TODO</button>` : ""}      
            ${item.status !== 'In Progress' ? `<button onclick="MoveTask(${item.id},'In Progress')">Move to Progress</button>` : ""}
   ${item.status !== 'Testing' ? `<button class="c" onclick="MoveTask(${item.id}, 'Testing')">Move to Testing</button>` : ""}
    ${item.status !== 'Finished' ? `<button class="d" onclick="MoveTask(${item.id}, 'Finished')">Move to Finished</button>` : ""}
                </div>
                
            </div>
            `;
            console.log(card);
            if (item.status === 'To Do')todo.appendChild(card);
            else if (item.status === 'In Progress') Progress.appendChild(card);
            else if (item.status === 'Testing') Testing.appendChild(card);
            else if (item.status === 'Finished') Finished.appendChild(card);
        })
        if (AddTask) AddTask.style.display = "block";

    }
}
displayTask();

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const title: string | null = (document.querySelector("#Title") as HTMLInputElement).value;
        const description: string | null = (document.querySelector("#Description") as HTMLInputElement).value;
        const Assign: string | null = (document.querySelector("#Assign") as HTMLInputElement).value;
        type TaskObj = {
            id: number,
            title: string | null,
            description: string | null,
            Assign: string | null,
            status: Status
        }
        const TaskData: TaskObj = {
            id: Date.now(),
            title: title,
            description: description,
            Assign: Assign,
            status: "To Do"
        }
        if (title.trim().length !== 0) {
            const Data = JSON.parse(localStorage.getItem("TaskTodo") || "[]");
            Data.push(TaskData);
            localStorage.setItem("TaskTodo", JSON.stringify(Data));
        }
        if (form) form.style.display = "none";
        if (AddTask) AddTask.style.display = "block";
          window.location.reload();
    })
}

(window as any).DeleteTask = DeleteTask;
(window as any).MoveTask = MoveTask;
