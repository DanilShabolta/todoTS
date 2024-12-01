import React, { useState } from "react";
import "../../style.css";
import Task from "../types/Task";

interface TaskItemProps {
  task: Task;
  onDragStart: () => void;
  onDragOver: (event: React.DragEvent) => void;
  onDragEnd: () => void;
  openInfo: (task: Task) => void;
  editTask: (task: Task) => void;
  openShareMenu: (task: Task) => void;
  openConfirm: (event: React.MouseEvent) => void;
  pinTask: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onDragStart,
  onDragOver,
  onDragEnd,
  openInfo,
  editTask,
  openShareMenu,
  openConfirm,
  pinTask,
}) => {
  const [isMenuVisible, setMenuVisible] = useState<boolean>(false);

  const toggleMenu = (event: React.MouseEvent) => {
    event.stopPropagation();
    setMenuVisible((prev) => !prev);
  };

  return (
    <div
      className="task-container"
      draggable={true}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      onClick={toggleMenu}
    >
      <div className="task-main">
        <div className="task-container-text">
          <h3 className="task-title">{task.title}</h3>
          <p className="task-description">{task.text}</p>
        </div>
        <button onClick={(event) => openConfirm(event)} className="delete-btn">
          X
        </button>
      </div>
      <div className={`task-dropdown-menu ${isMenuVisible ? "visible" : ""}`}>
        <button onClick={() => openShareMenu(task)}>
          <img src="../src/assets/button share.png" alt="Share" />
        </button>
        <button onClick={() => editTask(task)}>
          <img src="../src/assets/button edit.png" alt="Edit" />
        </button>
        <button onClick={() => openInfo(task)}>
          <img src="../src/assets/button info.png" alt="Info" />
        </button>
        <button
          onClick={() => pinTask(task)}
          style={{ backgroundColor: task.isPinned ? "yellow" : "transparent" }}
        >
          {task.isPinned ? "Unpin" : "Pin"}
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
