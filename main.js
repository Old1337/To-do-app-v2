"use strict";

const theInput = document.querySelector(".add-task input");
const addBtn = document.querySelector(".add-task .plus");

const tasksContainer = document.querySelector(".tasks-content");

const noTasksMsg = document.querySelector(".no-tasks-message");

const tasksCount = document.querySelector(".tasks-count span");
const completedCount = document.querySelector(".completed-tasks span");

addBtn.addEventListener("click", () => {
  if (theInput.value.trim() === "") {
    Swal.fire("This Input Can Not Be Empty!");
  } else {
    createEl();
  }
});

theInput.addEventListener("keypress", (e) => {
  if (e.code === "Enter" && theInput.value.trim() !== "") {
    createEl();
  } else if (e.code === "Enter" && theInput.value.trim() === "") {
    Swal.fire("This Input Can Not Be Empty!");
  }
});

theInput.onpaste = (e) => e.preventDefault();

function createEl() {
  const noTasksMsg = document.querySelector(".no-tasks-message");

  if (document.body.contains(document.querySelector(".no-tasks-message"))) {
    noTasksMsg.remove();
  }
  const mainSpan = document.createElement("span");

  const text = document.createTextNode(theInput.value);

  const tasks = document.querySelectorAll(".task-box");

  // a check for duplicated tasks
  if (tasks.length !== 0) {
    for (let i = 0; i < tasks.length; i++) {
      if (
        tasks[i].innerText.split("\n").shift().toLowerCase() ===
        theInput.value.trim().toLowerCase()
      ) {
        Swal.fire("You Have already added this task!");

        return;
      }
    }
  }
  const deleteBtn = document.createElement("span");

  const deleteText = document.createTextNode("Delete");

  mainSpan.appendChild(text);
  mainSpan.className = "task-box";

  deleteBtn.appendChild(deleteText);
  deleteBtn.className = "delete";

  mainSpan.appendChild(deleteBtn);

  tasksContainer.appendChild(mainSpan);

  theInput.value = "";
  theInput.focus();
  tasksLength();
  addTasksToLocalStorage();
}

document.addEventListener("click", (e) => {
  if (e.target.className === "delete") {
    e.target.parentElement.remove();
    removeTasksFromLocalStorage();
    if (tasksContainer.childElementCount === 0) {
      noTaskMsg();
    }
  }

  if (e.target.classList.contains("task-box")) {
    e.target.classList.toggle("finished");
  }
  addTasksToLocalStorage();
  tasksLength();
});

function noTaskMsg() {
  const msgSpan = document.createElement("span");

  const msgText = document.createTextNode("No Tasks To Show");

  msgSpan.appendChild(msgText);

  msgSpan.className = "no-tasks-message";

  tasksContainer.appendChild(msgSpan);
}

function tasksLength() {
  tasksCount.innerHTML = tasksContainer.childElementCount;

  completedCount.innerHTML = document.querySelectorAll(
    ".tasks-content .finished"
  ).length;
}

function addTasksToLocalStorage() {
  window.localStorage.setItem("tasks", tasksContainer.innerHTML);
}

function removeTasksFromLocalStorage() {
  localStorage.removeItem("tasks");
}

window.onload = () => {
  theInput.focus();
  const tasks = window.localStorage.getItem("tasks");
  tasksContainer.innerHTML = tasks;
  tasksLength();
};
