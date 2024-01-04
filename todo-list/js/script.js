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

function deleteTodo(event) {
  const del_li = event.target.parentElement; // click event가 일어난 버튼의 부모(=li)
  // todos 배열에서 del_li의 id와 정확히 일치하는 값을 찾아 제거
  todos = todos.filter((todo) => todo.id !== parseInt(del_li.id));
  del_li.remove();
  saveTodo();
}

function showTodo(todoObj) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  li.id = todoObj.id;
  li.innerText = todoObj.text;
  delBtn.innerText = "√";
  delBtn.addEventListener("click", deleteTodo);
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
    };
    showTodo(todoObj);
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
    showTodo(todos[i]);
  }
}
