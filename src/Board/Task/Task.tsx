import { useState } from "react";
import { api } from "@/api";
interface TaskProps {
  taskStatus: string;
  setTaskStatus: (taskStatus: string | null) => void;
  addTaskToBoard: (task: any) => void;
}

function Task({ taskStatus, setTaskStatus, addTaskToBoard }: TaskProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTask = {
      title: title,
      description: description,
      status: taskStatus,
    };
    try {
      const res = await api.post("/tasks", newTask);
      console.log("res----", res.data);
      // alert("Task added successfully");
      addTaskToBoard(res.data.task);
      setTitle("");
      setDescription("");
      setTaskStatus(null);
    } catch (error: any) {
      alert(error.response.data.message || "Failed to add task");
    }
  };
  return (
    <div className="task">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Task Description"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default Task;
