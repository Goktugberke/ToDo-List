document.addEventListener("DOMContentLoaded", function () {
    const todoInput = document.querySelector(".todoGiriniz"); // Kullanıcının girdiği metni alır
    const todoButton = document.querySelector(".todoEkle"); // Todo ekleme butonu
    const todoListContainer = document.querySelector(".section2"); // Yeni todo'ları buraya ekleyeceğiz
    const hrElement = document.querySelector(".hr"); // <hr> elementi
    const clearButton = document.querySelector(".todoTemizle"); // Tümünü temizleme butonu

    todoButton.addEventListener("click", function () {
        const todoText = todoInput.value.trim(); // Kullanıcının girdiği metni al

        if (todoText === "") return; // Boş girişleri engelle

        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todoItem");

        const todoP = document.createElement("p");
        todoP.classList.add("todoP");
        todoP.textContent = todoText;

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "&times;"; // Çarpı işareti
        deleteButton.classList.add("deleteTodo");

        deleteButton.addEventListener("click", function () {
            todoDiv.remove();
        });

        todoDiv.appendChild(todoP);
        todoDiv.appendChild(deleteButton);

        todoListContainer.insertBefore(todoDiv, clearButton);

        todoInput.value = "";
    });

    clearButton.addEventListener("click", function () {
        document.querySelectorAll(".todoItem").forEach(todo => todo.remove());
    });
});

