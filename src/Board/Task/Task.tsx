import { useState } from "react";
interface TaskProps {
    taskStatus: string;
    setTaskStatus: (taskStatus: string | null) => void;
    boardData: any[];
    setBoardData: (data: any[]) => void;
}
function Task({ taskStatus, setTaskStatus,boardData,setBoardData }: TaskProps) {
          const [title, setTitle] = useState("");
          const [description, setDescription] = useState("");
    return (
        <div className="task">
            <form onSubmit={(e) => {
                e.preventDefault();
                const obj = {
                    id: Date.now(),
                    title: title,
                    description: description,
                    status: taskStatus
                }
                console.log(obj);
                const existing = boardData;
                existing.push(obj);
                setBoardData(existing);
                console.log(existing);
              
                localStorage.setItem("board", JSON.stringify(existing));
                setTaskStatus("");
            }}>
                <input
                    type="text"
                    placeholder="Task Title"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea placeholder="Task Description" onChange={(e)=>setDescription(e.target.value)}></textarea>
                <button type="submit">Add</button>
           </form>
        </div>
    );
}

export default Task;