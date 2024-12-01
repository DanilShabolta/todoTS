export const getTasksFromLocalStorage = (): Array<any> => {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
};

export const saveTaskToLocalStorage = (tasks: Array<any>): void => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
