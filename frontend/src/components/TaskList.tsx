import React, { useEffect, useState } from "react";
import { Task } from "../models/Task";
import { getTasks, createTask, updateTask, deleteTask } from "../services/api";
import "../styles/App.css";

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTitle, setNewTitle] = useState("");

    const fetchTasks = async () => {
        const data = await getTasks();
        setTasks(data);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleAdd = async () => {
        if (newTitle.trim() === "") return;
        await createTask({ title: newTitle, description: "", completed: false });
        setNewTitle("");
        fetchTasks();
    };

    const handleToggle = async (task: Task) => {
        await updateTask(task.id, { ...task, completed: !task.completed });
        fetchTasks();
    };

    const handleDelete = async (id: number) => {
        await deleteTask(id);
        fetchTasks();
    };

    return (
        <div className="container">
            <h2>Task Tracker</h2>
            <div style={{ display: "flex", marginBottom: "10px" }}>
                <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="New Task"
                />
                <button onClick={handleAdd}>Add</button>
            </div>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <span
                            className={task.completed ? "completed" : ""}
                            onClick={() => handleToggle(task)}
                        >
                            {task.title}
                        </span>
                        <button className="delete-btn" onClick={() => handleDelete(task.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
