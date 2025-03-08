document.addEventListener("DOMContentLoaded", function () {
    const todoInput = document.querySelector(".todoGiriniz");
    const todoButton = document.querySelector(".todoEkle");
    const todoContainer = document.querySelector(".section1");
    const todoListContainer = document.querySelector(".section2");
    const todoSearchInput = document.querySelector(".todoAra");
    const hr = document.querySelector(".hr");
    const clearButton = document.querySelector(".todoTemizle");


    const StorageService = {
        getTodos: () => JSON.parse(localStorage.getItem("todos")) || [],
        saveTodo: (todoText) => {
            let savedTodos = StorageService.getTodos();
            savedTodos.push(todoText);
            localStorage.setItem("todos", JSON.stringify(savedTodos));
        },
        removeTodo: (todoText) => {
            let savedTodos = StorageService.getTodos().filter(todo => todo !== todoText);
            localStorage.setItem("todos", JSON.stringify(savedTodos));
        },
        clearTodos: () => localStorage.removeItem("todos")
    };

    function createButton(text = "&times;", className = "deleteTodo") {
        const button = document.createElement("button");
        button.innerHTML = text;
        button.classList.add(className);
        return button;
    }

    function createTodoElement(todoText) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todoItem");

        const todoP = document.createElement("p");
        todoP.classList.add("todoP");
        todoP.textContent = todoText;

        const deleteButton = createButton();
        deleteButton.addEventListener("click", function () {
            todoDiv.remove();
            StorageService.removeTodo(todoText);
        });

        todoDiv.appendChild(todoP);
        todoDiv.appendChild(deleteButton);
        return todoDiv;
    }

    function addTodoToDOM(todoElement) {
        todoListContainer.insertBefore(todoElement, clearButton);
    }

    function displayWarning(alertType, message, referenceElement, direction) {
        const existingAlert = document.querySelector(".warning");
        if (alertType === "warning" && existingAlert) return;

        const alertBox = document.createElement("div");
        if (alertType === "warning") {
            alertBox.classList.add("warning");
        } else if (alertType === "success") {
            alertBox.classList.add("success");
        }


        const deleteButton = createButton();
        deleteButton.addEventListener("click", () => alertBox.remove());

        const alertText = document.createElement("p");
        alertText.classList.add("alertP");
        alertText.textContent = message;

        alertBox.appendChild(alertText);
        alertBox.appendChild(deleteButton);

        if (direction === "before") {
            referenceElement.parentNode.insertBefore(alertBox, referenceElement);
        } else if (direction === "after") {
            referenceElement.parentNode.insertBefore(alertBox, referenceElement.nextSibling);

        }

        setTimeout(() => alertBox.remove(), 5000);
    }

    function loadTodos() {
        StorageService.getTodos().forEach(todoText => {
            const todoElement = createTodoElement(todoText);
            addTodoToDOM(todoElement);
        });
    }
    
    function filterTodos(searchText){
        document.querySelectorAll(".todoItem").forEach(todo => todo.remove());
        StorageService.getTodos().forEach(todoText => {
            if(todoText.toLowerCase().trim().includes(searchText)){
               
                const todoElement = createTodoElement(todoText);
                addTodoToDOM(todoElement);
            }
            })
            const number =document.querySelectorAll(".todoItem");
                if(number.length==0){
                    loadTodos();
                   displayWarning("warning","Aradığınız todo bulunamamıştır.",hr,"before");
                }

    }

    todoButton.addEventListener("click", function () {
        const todoText = todoInput.value.trim();
        if (!todoText) {
            displayWarning("warning", "Lütfen bir Todo giriniz!", todoButton, "before");
            return;
        }

        const todoElement = createTodoElement(todoText);
        addTodoToDOM(todoElement);
        displayWarning("success", "Ürün başarıyla kaydedilmiştir", todoButton, "after");
        StorageService.saveTodo(todoText);
        todoInput.value = "";
    });

    todoSearchInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            const searchText = todoSearchInput.value.toLowerCase().trim();
            if (!searchText) {
                displayWarning("warning","Lütfen bir metin giriniz!", todoSearchInput,"after");
                todoInput.value = "";
                return;
            }
            filterTodos(searchText);
            todoSearchInput.value = "";
        }
    });

    clearButton.addEventListener("click", function () {
        document.querySelectorAll(".todoItem").forEach(todo => todo.remove());
        StorageService.clearTodos();
        displayWarning("success", "Tüm ürünler temizlenmiştir", clearButton, "after");
    });

    loadTodos();
});