// Elementleri Seçilmesi

let taskDOM = document.querySelector("#task");
let btnDOM = document.querySelector("#liveToastBtn");
let listDOM = document.querySelector("#list");
let liveToastDOM = document.querySelector("#liveToast");

let alertMessage = document.querySelector("#alert")

btnDOM.addEventListener("onclick", newElement);
document.addEventListener("DomContentLoaded", displayLocalStorage());


function finisToDo() {
    this.classList.toggle("checked");
}

function removeList() {
    this.parentElement.remove();
    deleteLocal(this.previousSibling.textContent);
}

function createList(todo) {
    let liDOM = document.createElement("li");

    liDOM.innerHTML = todo;
    listDOM.appendChild(liDOM);

    let closeBtn = document.createElement("span");
    closeBtn.classList.add("close");
    closeBtn.textContent = "\u00D7";
    liDOM.append(closeBtn);

    closeBtn.onclick = removeList;
    $(".success").toast("show");
    liDOM.onclick = finisToDo;
}

function getLocalStorage() {
    let todo;
    if ( localStorage.getItem("todos") === null ) {
        todo = [];
    } else {
        todo = JSON.parse(localStorage.getItem("todos"));
    }
    return todo;
}

function createLocal(todo) {
    let todos = getLocalStorage();
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function newElement() {
    if (taskDOM.value) {
        createList(taskDOM.value);
        createLocal(taskDOM.value);
        taskDOM.value = "";
    } else
    $(".error").toast("show")
}


function displayLocalStorage() {
    let todos = getLocalStorage();
    todos.forEach( (todo) => { createList(todo);});
}

function deleteLocal(text) {
    let todos = getLocalStorage();
    todos.forEach( (todo, index ) => {
        if ( todo === text ) {
            todos.splice(index, 1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}
