import React from "react";
import "../../style.css";
import Task from "../types/Task";

interface InfoProps {
  task: Task | null;
  closeModal: () => void;
}

const Info: React.FC<InfoProps> = ({ task, closeModal }) => {
  if (!task) {
    return null;
  }

  return (
    <div className="overlay" onClick={closeModal}>
      <div className="info-content" onClick={(e) => e.stopPropagation()}>
        <h3>{task.title}</h3>
        <p>{task.text}</p>
        <button onClick={closeModal}>ok</button>
      </div>
    </div>
  );
};

export default Info;
