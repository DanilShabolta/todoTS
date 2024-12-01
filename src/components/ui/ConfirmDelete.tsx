import React from "react";
import "../../style.css";
import Task from "../types/Task";

interface ConfirmDeleteProps {
  task: Task | null;
  closeModal: () => void;
  removeTask: (task: Task) => void;
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({
  task,
  closeModal,
  removeTask,
}) => {
  const handleDelete = () => {
    if (task) {
      removeTask(task); // Убедитесь, что передаете task
      closeModal();
    }
  };

  return (
    <div className="overlay" onClick={closeModal}>
      <div className="confirm-delete">
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete this task?</p>
        <div className="delete-buttons">
          <button onClick={handleDelete}>Yes</button>
          <button onClick={closeModal}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
