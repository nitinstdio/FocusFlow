const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");

if (taskDate) {
    taskDate.value = new Date().toISOString().split("T")[0];
}
const addTask = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
if (taskInput && addTask && taskList) {
function updateCounter() {

    const total = document.querySelectorAll(".task").length;
    const completed = document.querySelectorAll(".checkTask:checked").length;

    document.getElementById("taskCounter").textContent =
        `Total Tasks: ${total} | Completed: ${completed}`;

    const progressBar = document.getElementById("progressBar");

    if (total === 0) {
        progressBar.style.width = "0%";
    } else {
        const percentage = (completed / total) * 100;
        progressBar.style.width = percentage + "%";
    }

}

function saveTasks() {

    const tasks = [];

    document.querySelectorAll(".task").forEach(task => {

        tasks.push({
            text: task.querySelector("span").innerText,
            completed: task.querySelector(".checkTask").checked,
            date: task.dataset.date
        });

    });

    localStorage.setItem("tasks", JSON.stringify(tasks));

}

function createTask(taskText, completed = false, date = null) {
     const task = document.createElement("div");
task.classList.add("task");
task.dataset.date = date || new Date().toISOString().split("T")[0];

task.innerHTML = `
    <input type="checkbox" class="checkTask">
    <span>${taskText}</span>
    <button class="deleteTask">🗑️</button>
`;

const deleteButton = task.querySelector(".deleteTask");
const checkbox = task.querySelector(".checkTask");
const taskSpan = task.querySelector("span");

checkbox.checked = completed;

if (completed) {
    taskSpan.classList.add("completed");
}

checkbox.addEventListener("change", function () {

    if (checkbox.checked) {
        taskSpan.classList.add("completed");
    } else {
        taskSpan.classList.remove("completed");
    }

    saveTasks();
    updateCounter();
});

deleteButton.addEventListener("click", function () {
    task.remove();
    saveTasks();
    updateCounter();
});

taskList.appendChild(task);
saveTasks();
updateCounter();
}

addTask.addEventListener("click", function () {

    if (taskInput.value.trim() === "") return;

    const taskDate = document.getElementById("taskDate").value;

    createTask(
        taskInput.value,
        false,
        taskDate || new Date().toISOString().split("T")[0]
    );

    taskInput.value = "";

});

taskInput.addEventListener("keydown", function(event){

    if(event.key === "Enter"){
        addTask.click();
    }

});
window.onload = function () {

    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    savedTasks.forEach(task => {
        createTask(task.text, task.completed, task.date);
    });
    
updateCounter();
};
}

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const resultsBox = document.getElementById("searchResults");

if (searchBtn && searchInput && resultsBox) {

    function performSearch() {

        const keyword = searchInput.value.toLowerCase().trim();

        if (keyword === "") {
            resultsBox.style.display = "none";
            return;
        }

        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const notes = JSON.parse(localStorage.getItem("notes")) || [];

        const taskResults = tasks.filter(task =>
            task.text.toLowerCase().includes(keyword)
        );

        const noteResults = notes.filter(note =>
            note.text.toLowerCase().includes(keyword)
        );

        resultsBox.innerHTML = "<h3>🔍 Search Results</h3>";

        if (taskResults.length === 0 && noteResults.length === 0) {

            resultsBox.innerHTML += `
                <div class="search-item">
                    No matching tasks or notes found.
                </div>
            `;

        } else {

            taskResults.forEach(task => {

                resultsBox.innerHTML += `
                    <div class="search-item">
                        ✅ ${task.text}
                    </div>
                `;

            });

            noteResults.forEach(note => {

                resultsBox.innerHTML += `
                    <div class="search-item">
                        📝 ${note.text}
                    </div>
                `;

            });

        }

        resultsBox.style.display = "block";
    }

    searchBtn.addEventListener("click", performSearch);

    searchInput.addEventListener("keyup", performSearch);

    searchInput.addEventListener("input", function () {

        if (searchInput.value.trim() === "") {
            resultsBox.style.display = "none";
        }

    });

}