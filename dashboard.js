function loadGreeting() {

    const hour = new Date().getHours();
    let greeting = "";

    if (hour < 12) {
        greeting = "☀️ Good Morning";
    } else if (hour < 18) {
        greeting = "🌤️ Good Afternoon";
    } else {
        greeting = "🌙 Good Evening";
    }

    document.getElementById("greeting").textContent = greeting;
}

loadGreeting();

function loadDate() {

    const today = new Date();

    document.getElementById("todayDate").textContent =
        today.toLocaleDateString("en-US", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });

}

loadDate();


const quotes = [
    "Small progress every day adds up to big results.",
    "Consistency beats intensity.",
    "Discipline creates freedom.",
    "Today's effort is tomorrow's success.",
    "One task at a time."
];

document.getElementById("quote").textContent =
    `"${quotes[Math.floor(Math.random() * quotes.length)]}"`;


function updateDashboard() {

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;

    const productivity =
        total === 0 ? 0 : Math.round((completed / total) * 100);

    document.getElementById("totalTasks").textContent = total;
    document.getElementById("completedTasks").textContent = completed;
    document.getElementById("pendingTasks").textContent = pending;
    document.getElementById("productivity").textContent = productivity + "%";

    const sessionCount =
        Number(localStorage.getItem("sessions")) || 0;

    const totalFocusTime =
        Number(localStorage.getItem("focusTime")) || 0;

    document.getElementById("focusSessions").textContent = sessionCount;
    document.getElementById("focusTime").textContent = totalFocusTime + " min";

}


function loadTodayTasks() {

    const todayTasks = document.getElementById("todayTasks");

    if (!todayTasks) return;

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    todayTasks.innerHTML = "";

    if (tasks.length === 0) {

        todayTasks.innerHTML = "<p>No tasks yet.</p>";
        return;

    }

    tasks.slice(0, 5).forEach(task => {

        const div = document.createElement("div");

        div.classList.add("today-task-item");

        if (task.completed) {
            div.classList.add("completed");
        }

        div.innerHTML =
            `${task.completed ? "✅" : "⬜"} ${task.text}`;

        todayTasks.appendChild(div);

    });

}


updateDashboard();
loadTodayTasks();

setInterval(() => {

    updateDashboard();
    loadTodayTasks();

}, 1000);