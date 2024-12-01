import React from "react";
import TaskItem from "./ui/TaskItem";
import { iTask } from "./types/Task";

interface TaskListProps {
  tasks: iTask[];
  handleDragStart: (index: number) => void;
  handleDragOver: (index: number) => void;
  handleDragEnd: () => void;
  openInfo: (task: iTask) => void;
  openEdit: (task: iTask) => void;
  openShareMenu: (task: iTask) => void;
  openConfirm: (task: iTask, event: React.MouseEvent) => void;
  removeTask: (task: iTask) => void;
  togglePinTask: (task: iTask) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  handleDragStart,
  handleDragOver,
  handleDragEnd,
  openInfo,
  openEdit,
  openShareMenu,
  openConfirm,
  togglePinTask,
}) => {
  return (
    <div id="task-list">
      {tasks.map((task, index) => (
        <TaskItem
          key={task.id}
          task={task}
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => {
            e.preventDefault();
            handleDragOver(index);
          }}
          onDragEnd={handleDragEnd}
          openInfo={openInfo}
          editTask={openEdit}
          openShareMenu={openShareMenu}
          openConfirm={(event) => openConfirm(task, event)}
          pinTask={togglePinTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
