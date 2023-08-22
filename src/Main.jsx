import React from "react";
import { useState } from "react";

function Main() {
  const storageJobs = JSON.parse(localStorage.getItem("tasks"));
  const [tasks, setTasks] = useState(
    Array.isArray(storageJobs) ? storageJobs : []
  );
  const [newTask, setNewTask] = useState("");
  const [currentTab, setCurrentTab] = useState("all");

  const addTask = () => {
    setTasks((prev) => {
      const newJobs = [...prev, { name: newTask, completed: false }];
      console.log(newJobs);
      const jsonJobs = JSON.stringify(newJobs);
      localStorage.setItem("tasks", jsonJobs);
      return newJobs;
    });
    setNewTask("");
  };

  const deleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
    const removeTasks = JSON.stringify(newTasks);
    localStorage.setItem("tasks", removeTasks);
    localStorage.removeItem("tasks[]");
  };

  const tabClick = (tab) => {
    setCurrentTab(tab);
  };

  const listTask = () => {
    if (currentTab === "active") {
      return tasks.filter((task) => !task.completed);
    } else if (currentTab === "complete") {
      return tasks.filter((task) => task.completed);
    } else {
      return tasks;
    }
  };

  const completeTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
    const updateTasks = JSON.stringify(newTasks);
    localStorage.setItem("tasks", updateTasks);
  };

  return (
    <div className="container-box">
      <div className="todoList">
        <div className="title">
        <h1>Todo List</h1>
        </div>
        <div className="btnArea">
          <button
            className={currentTab === "all" ? "active" : ""}
            onClick={() => tabClick("all")}
          >
            All
          </button>
          <button
            className={currentTab === "active" ? "active" : ""}
            onClick={() => tabClick("active")}
          >
            Not Finished
          </button>
          <button
            className={currentTab === "complete" ? "active" : ""}
            onClick={() => tabClick("complete")}
          >
            Done
          </button>
        </div>
        
        <ul>
          {listTask().map((task, index) => (
            <li key={index}>
              <input
                type= "checkbox"
                checked={task.completed}
                onChange={() => completeTask(index)}
              />
              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                {task.name}
                <hr />
              </span>
              <button onClick={() => deleteTask(index)}>Delete</button>
            </li>
          ))}
        </ul>
        <div className="form-box">
          <input
            className="yourJob"
            placeholder="Enter task..."
            type="text"
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
          />
          <button className="btnAdd" onClick={addTask}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default Main;
