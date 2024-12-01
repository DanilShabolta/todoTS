import React, { useState } from "react";
import Task from "../types/Task";
import "../../style.css";

interface TaskFormProps {
  addTask: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
  const [taskTitle, setTaskTitle] = useState<string>(""); // Укажите тип состояния
  const [taskText, setTaskText] = useState<string>(""); // Укажите тип состояния

  const handleAddTask = () => {
    if (taskTitle.trim() && taskText.trim()) {
      const newTask = new Task(taskTitle, taskText, 0); // Создаем новый объект Task
      addTask(newTask);
      setTaskTitle("");
      setTaskText("");
    }
  };

  return (
    <div id="task-form">
      <div id="task-input-container">
        <div className="task-input-text">
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="Task Title"
          />
          <input
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="Task Description"
          />
        </div>
        <button onClick={handleAddTask} className="add-button-container">
          +
        </button>
      </div>
    </div>
  );
};

export default TaskForm;
