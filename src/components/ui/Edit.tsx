import React, { useState, useEffect } from "react";
import "../../style.css";
import Task from "../types/Task";

interface EditProps {
  task: Task;
  closeModal: () => void;
  saveEditTask: (updatedTask: Partial<Task>) => void;
}

const Edit: React.FC<EditProps> = ({ task, saveEditTask, closeModal }) => {
  const [title, setTitle] = useState<string>(task.title);
  const [text, setText] = useState<string>(task.text);

  useEffect(() => {
    setTitle(task.title);
    setText(task.text);
  }, [task.title, task.text]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleSave = () => {
    if (title.trim() && text.trim()) {
      saveEditTask({ title, text });
      closeModal();
    }
  };

  return (
    <div className="overlay" onClick={closeModal}>
      <div className="edit-container" onClick={(e) => e.stopPropagation()}>
        <input
          type="text"
          className="edit-title"
          value={title}
          onChange={handleTitleChange}
        />
        <textarea
          className="edit-description"
          value={text}
          onChange={handleTextChange}
        />
        <div className="edit-buttons">
          <button onClick={handleSave}>Сохранить</button>
          <button onClick={closeModal}>Отменить</button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
