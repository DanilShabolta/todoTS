import React from "react";
import "../../style.css";
import Task from "../types/Task";

interface ShareMenuProps {
  task: Task | null;
  closeModal: () => void;
}

const ShareMenu: React.FC<ShareMenuProps> = ({ closeModal }) => {
  return (
    <div className="overlay" onClick={closeModal}>
      <div className="share-menu" onClick={(e) => e.stopPropagation()}>
        <button className="share-copy">
          <img src="./src/assets/share/share copy.png" alt="Share Copy" />
        </button>
        <button className="share-vk">
          <img src="./src/assets/share/share vk.png" alt="Share VK" />
        </button>
        <button className="share-tg">
          <img src="./src/assets/share/share tg.svg" alt="Share TG" />
        </button>
        <button className="share-ws">
          <img src="./src/assets/share/share ws.svg" alt="Share WS" />
        </button>
        <button className="share-fb">
          <img src="./src/assets/share/share fb.svg" alt="Share FB" />
        </button>
      </div>
    </div>
  );
};

export default ShareMenu;
