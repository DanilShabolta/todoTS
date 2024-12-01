import React, { useState, useEffect } from "react";
import TaskForm from "./ui/TaskForm";
import TaskList from "./TaskList";
import "../style.css";
import { getTasksFromLocalStorage } from "./utils/TaskStorage";
import Info from "./ui/Info";
import Edit from "./ui/Edit";
import ShareMenu from "./ui/ShareMenu";
import ConfirmDelete from "./ui/ConfirmDelete";
import { useSelector, useDispatch } from "react-redux";
import {
  addTodo,
  removeTodo,
  moveTask,
  editTask,
  pinTask,
  unpinTask,
} from "./redux/todoSlice";
import { RootState } from "./redux/store";
import Task from "./types/Task";

const TaskManager: React.FC = () => {
  const [draggedTaskIndex, setDraggedTaskIndex] = useState<number | null>(null);
  const [showNoTasksMessage, setShowNoTasksMessage] = useState<boolean>(true);
  const [isInfoVisible, setInfoVisible] = useState<boolean>(false);
  const [isEditVisible, setEditVisible] = useState<boolean>(false);
  const [isShareMenuVisible, setShareMenuVisible] = useState<boolean>(false);
  const [isConfirmDeleteVisible, setConfirmDeleteVisible] =
    useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.todos);

  useEffect(() => {
    checkTasks();
  }, [tasks]);

  const checkTasks = () => {
    const storedTasks = getTasksFromLocalStorage() || [];
    setShowNoTasksMessage(storedTasks.length === 0);
  };

  const addTask = (newTask: Task) => {
    dispatch(addTodo(newTask));
  };

  const removeTask = (task: Task) => {
    dispatch(removeTodo(task.id));
    console.log("Задача удалена:", task.id);
    setConfirmDeleteVisible(false);
  };

  const handleDragStart = (index: number) => {
    setDraggedTaskIndex(index);
  };

  const handleDragOver = (index: number) => {
    if (draggedTaskIndex === null || draggedTaskIndex === index) return;

    dispatch(moveTask({ fromIndex: draggedTaskIndex, toIndex: index }));
    setDraggedTaskIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedTaskIndex(null);
  };

  const closeModal = () => {
    setShareMenuVisible(false);
    setEditVisible(false);
    setInfoVisible(false);
    setSelectedTask(null);
    setConfirmDeleteVisible(false);
  };

  const openInfo = (task: Task) => {
    setSelectedTask(task);
    setInfoVisible(true);
  };

  const openEdit = (task: Task) => {
    dispatch(editTask(task));
    setSelectedTask(task);
    setEditVisible(true);
  };

  const openShareMenu = (task: Task) => {
    setSelectedTask(task);
    setShareMenuVisible(true);
  };

  const openConfirm = (task: Task) => {
    setSelectedTask(task);
    setConfirmDeleteVisible(true);
  };

  const saveEditTask = (updatedTask: Partial<Task>) => {
    if (selectedTask) {
      const taskToUpdate: Task = {
        id: selectedTask.id,
        title: selectedTask.title,
        text: selectedTask.text,
        index: selectedTask.index,
        ...updatedTask,
      };

      dispatch(editTask(taskToUpdate));
      setSelectedTask(null);
      closeModal();
    }
  };

  const togglePinTask = (task: Task) => {
    if (task.isPinned) {
      dispatch(unpinTask(task));
    } else {
      dispatch(pinTask(task));
    }
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    return (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0);
  });

  return (
    <div id="app">
      <TaskForm addTask={addTask} />
      {showNoTasksMessage && <div className="no-tasks-message">No tasks</div>}
      <TaskList
        tasks={sortedTasks}
        removeTask={removeTask}
        handleDragStart={handleDragStart}
        handleDragOver={handleDragOver}
        handleDragEnd={handleDragEnd}
        openInfo={openInfo}
        openEdit={openEdit}
        openShareMenu={openShareMenu}
        openConfirm={openConfirm}
        togglePinTask={togglePinTask}
      />
      {isInfoVisible && <Info task={selectedTask} closeModal={closeModal} />}
      {isEditVisible && (
        <Edit
          task={selectedTask as Task}
          saveEditTask={saveEditTask}
          closeModal={closeModal}
        />
      )}
      {isShareMenuVisible && (
        <ShareMenu task={selectedTask} closeModal={closeModal} />
      )}
      {isConfirmDeleteVisible && (
        <ConfirmDelete
          task={selectedTask}
          removeTask={removeTask}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default TaskManager;
