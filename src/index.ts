const button = document.querySelector(".btn")! as HTMLButtonElement; // ! is a non-null assertion operator
const input = document.getElementById("todo")! as HTMLInputElement;
const form = document.querySelector("#todo-form")! as HTMLFormElement;
const list = document.querySelector("ul")! as HTMLUListElement;

interface Todo {
    text: string;
    complete: boolean;
}

const todos: Todo[] = readTodos();
todos.forEach(createTodo);

function readTodos(): Todo[] {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos === null) return [];
    return JSON.parse(savedTodos);
}

function handleSubmit(e: SubmitEvent) {
  e.preventDefault();
  if (input.value === "") return;
    const newTodo: Todo = {
        text: input.value,
        complete: false,
    }
    todos.push(newTodo);
    createTodo(newTodo);
    saveTodos();

  input.value = "";
}

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function createTodo(todo: Todo) {
    const newLi = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.complete;
    checkbox.addEventListener("change", () => {
        todo.complete = !todo.complete;
        saveTodos();
    })
    newLi.append(todo.text);
    newLi.append(checkbox);
    list.append(newLi);
}

form.addEventListener("submit", handleSubmit);