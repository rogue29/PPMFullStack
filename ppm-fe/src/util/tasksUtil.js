import * as constants from "./constants";

const tasksUtil = tasksArr => {
  const toDoTasks = [];
  const inProgressTasks = [];
  const doneTasks = [];

  tasksArr.forEach(task => {
    switch (task.priority) {
      case 1:
        task.priority = "HIGH";
        task.dynamicStyle = "bg-danger text-light";
        break;
      case 2:
        task.priority = "MEDIUM";
        task.dynamicStyle = "bg-warning text-light";
        break;
      case 3:
        task.priority = "LOW";
        task.dynamicStyle = "bg-info text-light";
        break;
      default:
        break;
    }

    switch (task.status) {
      case constants.TO_DO:
        toDoTasks.push(task);
        break;
      case constants.IN_PROGRESS:
        inProgressTasks.push(task);
        break;
      case constants.DONE:
        doneTasks.push(task);
        break;
      default:
        console.log("Task doesn't belong in any category - ", task);
        break;
    }
  });

  return [toDoTasks, inProgressTasks, doneTasks];
};

export default tasksUtil;
