"use strict";
var button = document.querySelector(".btn"); // ! is a non-null assertion operator
var input = document.getElementById("todo");
var form = document.querySelector("#todo-form");
var list = document.querySelector("ul");
var todos = readTodos();
todos.forEach(createTodo);
function readTodos() {
    var savedTodos = localStorage.getItem("todos");
    if (savedTodos === null)
        return [];
    return JSON.parse(savedTodos);
}
function handleSubmit(e) {
    e.preventDefault();
    if (input.value === "")
        return;
    var newTodo = {
        text: input.value,
        complete: false,
    };
    todos.push(newTodo);
    createTodo(newTodo);
    saveTodos();
    input.value = "";
}
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}
function createTodo(todo) {
    var newLi = document.createElement("li");
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.complete;
    checkbox.addEventListener("change", function () {
        todo.complete = !todo.complete;
        saveTodos();
    });
    newLi.append(todo.text);
    newLi.append(checkbox);
    list.append(newLi);
}
form.addEventListener("submit", handleSubmit);
