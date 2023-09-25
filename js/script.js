const mainForm = document.getElementById("container");
const taskInput = mainForm.querySelector("input");
const addButton = mainForm.querySelector("button");
const toDoList = document.getElementById("todo-list");

let toDos = [];
const TODOS_KEY = "todos";

// const loginInput = document.querySelector("#container input");
// const loginButton = document.querySelector("#container button");

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function delToDo(event) {
  const li_del = event.target.parentElement;
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li_del.id));
  li_del.remove();
  saveToDos();
}

function paintToDo(taskObj) {
  const li = document.createElement("li");
  li.id = taskObj.id;
  const span = document.createElement("span");
  span.innerText = taskObj.text;
  const delButton = document.createElement("button");
  delButton.innerText = "X";
  delButton.addEventListener("click", delToDo);
  li.appendChild(span);
  li.appendChild(delButton);
  toDoList.appendChild(li);
}
function addClick() {
  const task = taskInput.value;
  if (task === "") {
    alert("할 일을 입력하지 않았습니다!!!!");
  } else {
    taskInput.value = "";
    taskObj = {
      id: Date.now(),
      text: task,
    };
    toDos.push(taskObj);
    paintToDo(taskObj);
    saveToDos();
  }
}
addButton.addEventListener("click", addClick);
const savedToDos = localStorage.getItem(TODOS_KEY);
if (savedToDos) {
  // if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}
