const todoForm = document.querySelector("#todo-input");
const todoInput = todoForm.querySelector("input");
const todoButton = todoForm.querySelector("button");
const todoList = document.querySelector("#todo-list");

let todos = []; // 할 일 목록을 저장할 배열
const todo_key = "todos"; // localstorage의 key로 저장할 단어

function saveTodo() {
  // localstorage에 todos리스트를 저장.
  localStorage.setItem(todo_key, JSON.stringify(todos)); // 두번째인자는 string
}

function checkTodo(event) {
  const check_li = event.target.parentElement;
  // check 여부 토글
  check_li.classList.toggle("checked");
  // todos를 탐색하여 해당 id를 가진 녀석의 checked를 true로 변경
  todos.forEach((todo) => {
    if (todo.id === parseInt(check_li.parentElement.id)) {
      todo.checked = !todo.checked;
      return false;
    }
  });
  saveTodo();
}

function deleteTodo(event) {
  const del_li = event.target.parentElement; // click event가 일어난 버튼의 부모(=li)
  // todos 배열에서 del_li의 id와 정확히 일치하는 값을 찾아 제거
  todos = todos.filter((todo) => todo.id !== parseInt(del_li.id));
  del_li.remove();
  saveTodo();
}

function paintTodo(todoObj) {
  const li = document.createElement("li");
  const checkDiv = document.createElement("div");
  const checkBtn = document.createElement("button");
  const text = document.createElement('span');
  const delBtn = document.createElement("button");
  li.id = todoObj.id;
  checkBtn.id = 'check-btn';
  delBtn.id = 'del-btn';

  if(todoObj.checked == true) {
    checkDiv.classList.add('checked');
  }
  
  text.textContent = todoObj.text;
  delBtn.textContent = "DEL";

  checkBtn.addEventListener('click', checkTodo);
  delBtn.addEventListener("click", deleteTodo);
  checkDiv.appendChild(checkBtn);
  checkDiv.appendChild(text);
  li.appendChild(checkDiv);
  li.appendChild(delBtn);
  todoList.appendChild(li);
}

function clickAdd() {
  const todo = todoInput.value;
  if (todo === "") {
    // 입력 안하고 버튼 누름
    alert("할 일을 먼저 입력하셔야 합니다.");
  } else {
    const todoObj = {
      id: Date.now(), // id를 현재 시각으로 부여
      text: todo,
      checked: false,
    };
    paintTodo(todoObj);
    todoInput.value = ""; // 입력 칸 비우기
    todos.push(todoObj); // todo를 목록에 저장
    saveTodo(); // localStorage에 todos 업데이트
  }
}

todoButton.addEventListener("click", clickAdd); // 버튼을 클릭하면 clickAdd 실행
// localstorage에서 todos 확인
const items = localStorage.getItem(todo_key);
if (items) {
  // 이미 적어놓은 할일이 있으면
  const parsedItems = JSON.parse(items); // string을 객체로
  todos = parsedItems;

  for (let i = 0; i < todos.length; i++) {
    // todos를 순서대로 화면에 표시
    paintTodo(todos[i]);
  }
}

// enter 입력 시 add 버튼 누르는 기능
todoInput.addEventListener('keypress', (e) => {
  if(e.code == 'Enter') clickAdd();
});