document.addEventListener("DOMContentLoaded", function () {
    const todoInput = document.querySelector(".todoGiriniz");
    const todoButton = document.querySelector(".todoEkle");
    const todoListContainer = document.querySelector(".section2");
    const clearButton = document.querySelector(".todoTemizle");

    function loadTodos() {
        const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
        savedTodos.forEach(todoText => addTodoToDOM(todoText));
    }

    function addTodoToDOM(todoText) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todoItem");

        const todoP = document.createElement("p");
        todoP.classList.add("todoP");
        todoP.textContent = todoText;

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "&times;";
        deleteButton.classList.add("deleteTodo");

        deleteButton.addEventListener("click", function () {
            todoDiv.remove();
            removeFromLocalStorage(todoText);
        });

        todoDiv.appendChild(todoP);
        todoDiv.appendChild(deleteButton);

        todoListContainer.insertBefore(todoDiv, clearButton);
    }

    function removeFromLocalStorage(todoText) {
        let savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
        savedTodos = savedTodos.filter(todo => todo !== todoText);
        localStorage.setItem("todos", JSON.stringify(savedTodos));
    }

    todoButton.addEventListener("click", function () {
        const todoText = todoInput.value.trim();
        if (todoText === "") return;

        addTodoToDOM(todoText); 

        let savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
        savedTodos.push(todoText);
        localStorage.setItem("todos", JSON.stringify(savedTodos));

        todoInput.value = ""; 
    });

    clearButton.addEventListener("click", function () {
        document.querySelectorAll(".todoItem").forEach(todo => todo.remove());
        localStorage.removeItem("todos"); 
    });

    loadTodos();
});
