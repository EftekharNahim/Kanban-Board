import { useEffect, useState } from "react";
import "./board.css";
import Task from "./Task/Task.tsx";
// Update the import path below to the correct location of your Button component.
// For example, if using shadcn/ui, it should be:
import { Button } from "@/components/ui/button";
// Or adjust the path as needed to point to the correct file.

function Board({ uid, setUid }: { uid: string | null; setUid: (uid: string | null) => void }) {
    const [status, setStatus] = useState<string | null>(null);
    const [boardData, setBoardData] = useState<any[]>([]);
    const taskStatuses = ["todo", "in-progress", "testing", "finished"];
    useEffect(() => {
        const boardItem = localStorage.getItem("board");
        const existing = boardItem ? JSON.parse(boardItem) : [];
        setBoardData(existing);
    }, []);
    
    const deleteTask = (index: number) => {
        const updatedTasks = boardData.filter((_, i) => i !== index);
        setBoardData(updatedTasks);
        localStorage.setItem("board", JSON.stringify(updatedTasks));
    };

    

    const filteredTasks = (taskStatus: string) => {
        return boardData?.filter((task) => task.status === taskStatus).map((task, index) => (
                      <div key={index} className="taskCard" >
                          <h4>{task.title}</h4>
                <p>{task.description}</p>
                <div >
                    <Button onClick={()=>deleteTask(index)}>Delete</Button>
                    {taskStatuses.map((status) => (
                        status !== task.status && (
                            <Button style={{backgroundColor:"blue", margin:"2px"}} key={status} onClick={() => {
                                const updatedTasks = boardData.map((t, i) => {
                                    if (t.id === task.id) {
                                        return { ...t, status: status }
                                    }
                                    return t;
                                });
                                setBoardData(updatedTasks);
                                localStorage.setItem("board", JSON.stringify(updatedTasks));
                            }}>{status}</Button>
                        )
                    ))}
                 </div>
                          <hr />
                      </div>
                  ))
    };

  return (
      <>
          <nav className="board-nav">
              <p>{uid}</p> 
              <p onClick={()=>setUid("log")}>logout</p>
          </nav>
      <div className="container">
        <div id="todo" className="taskStatus">
          <h3>To Do</h3>
                  <hr />
                  <div id="todo-tasks">
                      
                      {status === "todo" ? <Task taskStatus="todo" setTaskStatus={ setStatus} boardData={boardData} setBoardData={setBoardData}/> : <button onClick={() => setStatus("todo")}>Add task</button>}
                      
                  </div>
                  {filteredTasks("todo")}   
        </div>
        <div id="in-progress" className="taskStatus">
          <h3>In Progress</h3>
                  <hr />
                    <div id="in-progress-tasks">
                      {status === "in-progress" ? <Task taskStatus="in-progress" setTaskStatus={ setStatus} boardData={boardData} setBoardData={setBoardData}/> : <button onClick={() => setStatus("in-progress")}>Add task</button>}
                  </div>
                  {filteredTasks("in-progress")}
        </div>
        <div id="testing" className="taskStatus">
          <h3>Testing</h3>
                  <hr />
                  <div id="testing-tasks">
                      {status === "testing" ? <Task taskStatus="testing" setTaskStatus={setStatus} boardData={boardData} setBoardData={setBoardData}/> : <button onClick={() => setStatus("testing")}>Add task</button>}  
                  </div>
                    {filteredTasks("testing")}
        </div>
        <div id="finished" className="taskStatus">
          <h3>Finished</h3>
                  <hr />
                  <div id="finished-tasks">
                      {status === "finished" ? <Task taskStatus="finished" setTaskStatus={setStatus} boardData={boardData} setBoardData={setBoardData} /> : <button onClick={() => setStatus("finished")}>Add task</button>}
                  </div>
                    {filteredTasks("finished")}
        </div>
      </div>
    </>
  );
}

export default Board;
