class Task {
  constructor(id, description) {
    this.id = id;
    this.description = description;
    this.completed = false;
  }
}

class TaskManager {
  constructor() {
    this.tasks = [];
    this.lastId = 0;
  }

  addTask(description) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // increasing the task id by one each time a new task is added
        const task = new Task(++this.lastId, description);
        // pushing the new task into an array
        this.tasks.push(task);
        resolve(task);
      }, 100);
    });
  }

  completeTask(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const task = this.tasks.find((task) => task.id === id);
        if (task) {
          task.completed = true;
          resolve(task);
        } else {
          reject(`Task with ID ${id} not found`);
        }
      }, 100);
    });
  }

  getCompletedTasks() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.tasks.filter((task) => task.completed));
      }, 100);
    });
  }
}

const taskManager = new TaskManager();

function addNewTask() {
  const input = document.getElementById("taskInput");
  const description = input.value;
  if (description) {
    taskManager.addTask(description).then((task) => {
      const taskList = document.getElementById("taskList");
      const li = document.createElement("li");
      li.textContent = task.description;
      li.id = `task-${task.id}`;
      const completeButton = document.createElement("button");
      completeButton.textContent = "Complete";
      completeButton.onclick = () => completeTask(task.id);
      li.appendChild(completeButton);
      taskList.appendChild(li);
      input.value = "";
    });
  }
}

function completeTask(id) {
  taskManager
    .completeTask(id)
    .then(() => {
      const taskItem = document.getElementById(`task-${id}`);
      taskItem.classList.add("completed");
      taskItem.removeChild(taskItem.querySelector("button")); // Remove the complete button

      // Move to completed tasks list
      const completedTasks = document.getElementById("completedTasks");
      completedTasks.appendChild(taskItem);
    })
    .catch((error) => console.error(error));
}
