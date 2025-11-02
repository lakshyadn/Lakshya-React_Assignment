import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState([]); // { id, text, completed }
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all"); // all | active | completed

  // Add new task
  function addTask(e) {
    e.preventDefault();
    if (!text.trim()) return;
    const newTask = { id: Date.now(), text: text.trim(), completed: false };
    setTasks([newTask, ...tasks]);
    setText("");
  }

  // Toggle complete/incomplete
  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  // Delete a task
  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  // Clear all completed
  function clearCompleted() {
    setTasks(tasks.filter((t) => !t.completed));
  }

  // Filtered view
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const activeCount = tasks.filter((t) => !t.completed).length;

  return (
    <div className="app-container">
      <h1>Personal Task Manager</h1>

      <form onSubmit={addTask}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task"
        />
        <button type="submit">Add</button>
      </form>

      <div className="filters">
        <button onClick={() => setFilter("all")} disabled={filter === "all"}>
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          disabled={filter === "active"}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          disabled={filter === "completed"}
        >
          Completed
        </button>
      </div>

      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.text}
            </span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <div className="stats">
        <span>{activeCount} active</span>
        <span>{tasks.length} total</span>
      </div>

      <button
        onClick={clearCompleted}
        disabled={!tasks.some((t) => t.completed)}
      >
        Clear completed
      </button>
    </div>
  );
}
