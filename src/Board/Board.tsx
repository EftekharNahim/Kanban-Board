import { useEffect, useState } from "react";
import "./board.css";
import Task from "./Task/Task.tsx";

import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";

function Board() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>("");
  const [status, setStatus] = useState<string | null>(null);
  const [boardData, setBoardData] = useState<any[]>([]);
  const taskStatuses = ["todo", "in-progress", "testing", "finished"];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/me");
        setUsername(res.data.user.username);

        const tasksRes = await api.get("/tasks");
        setBoardData(tasksRes.data.tasks);
      } catch (err: any) {
        alert(err.response.data.message);
        navigate("/login");
      }
    };
    fetchUser();
  }, []);

  const addTaskToBoard = (task: any) => {
    setBoardData((prev) => [...prev, task]);
  };

  const deleteTask = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);
      const updatedTasks = boardData.filter((task) => task.id !== id);
      setBoardData(updatedTasks);
    } catch (error: any) {
      alert(error.response.data.message || "Failed to delete task");
    }
  };

  const filteredTasks = (taskStatus: string) => {
    return boardData
      ?.filter((task) => task.status === taskStatus)
      .map((task, index) => (
        <div key={index} className="taskCard">
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <div>
            <Button onClick={() => deleteTask(task.id)}>Delete</Button>
            {taskStatuses.map(
              (status) =>
                status !== task.status && (
                  <Button
                    className="bg-amber-50 rounded-md text-white m-2"
                    key={status}
                    onClick={async () => {
                      await api.put(`/tasks/${task.id}`, { status });

                      setBoardData((prev) =>
                        prev.map((t) =>
                          t.id === task.id ? { ...t, status } : t
                        )
                      );
                    }}
                  >
                    {status}
                  </Button>
                )
            )}
          </div>
          <hr />
        </div>
      ));
  };

  const handleLogout = async () => {
    try {
      await api.post("/logout"); // call backend logout
      navigate("/login"); // redirect to login page
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <>
      <nav className="board-nav">
        <p className="p-2 rounded-md bg-teal-200 text-2xl m-2">{username}</p>
        <Link
          to="/login"
          onClick={handleLogout}
          className="p-2 hover:bg-red-600 rounded-md bg-teal-200 m-2"
        >
          Log Out
        </Link>
      </nav>
      <div className="container">
        <div id="todo" className="taskStatus">
          <h3>To Do</h3>
          <hr />
          <div id="todo-tasks">
            {status === "todo" ? (
              <Task
                taskStatus="todo"
                setTaskStatus={setStatus}
                addTaskToBoard={addTaskToBoard}
              />
            ) : (
              <button onClick={() => setStatus("todo")}>Add task</button>
            )}
          </div>
          {filteredTasks("todo")}
        </div>
        <div id="in-progress" className="taskStatus">
          <h3>In Progress</h3>
          <hr />
          <div id="in-progress-tasks">
            {status === "in-progress" ? (
              <Task
                taskStatus="in-progress"
                setTaskStatus={setStatus}
                addTaskToBoard={addTaskToBoard}
              />
            ) : (
              <button onClick={() => setStatus("in-progress")}>Add task</button>
            )}
          </div>
          {filteredTasks("in-progress")}
        </div>
        <div id="testing" className="taskStatus">
          <h3>Testing</h3>
          <hr />
          <div id="testing-tasks">
            {status === "testing" ? (
              <Task
                taskStatus="testing"
                setTaskStatus={setStatus}
                addTaskToBoard={addTaskToBoard}
              />
            ) : (
              <button onClick={() => setStatus("testing")}>Add task</button>
            )}
          </div>
          {filteredTasks("testing")}
        </div>
        <div id="finished" className="taskStatus">
          <h3>Finished</h3>
          <hr />
          <div id="finished-tasks">
            {status === "finished" ? (
              <Task
                taskStatus="finished"
                setTaskStatus={setStatus}
                addTaskToBoard={addTaskToBoard}
              />
            ) : (
              <button onClick={() => setStatus("finished")}>Add task</button>
            )}
          </div>
          {filteredTasks("finished")}
        </div>
      </div>
    </>
  );
}

export default Board;
