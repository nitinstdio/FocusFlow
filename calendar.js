const monthYear = document.getElementById("monthYear");
const calendarDays = document.getElementById("calendarDays");
const prevMonth = document.getElementById("prevMonth");
const nextMonth = document.getElementById("nextMonth");

let currentDate = new Date();

function renderCalendar() {

    calendarDays.innerHTML = "";

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const months = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ];

    monthYear.textContent = `${months[month]} ${year}`;

    // Empty boxes before first day
    for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement("div");
        empty.classList.add("day", "empty");
        calendarDays.appendChild(empty);
    }

    // Dates
    for (let day = 1; day <= lastDate; day++) {

        const dayBox = document.createElement("div");
        dayBox.classList.add("day");
        dayBox.textContent = day;
        
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

        const currentDay = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

        const hasTask = tasks.some(task => {
            return task.date === currentDay;
});

        if (hasTask) {
            const dot = document.createElement("div");
            dot.classList.add("task-dot");
            dayBox.appendChild(dot);
}

        const today = new Date();

        if (
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {
            dayBox.classList.add("today");
        }

        dayBox.addEventListener("click", function () {

            const selectedTasks = document.getElementById("selectedTasks");

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const currentDay =
`${year}-${String(month + 1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;

const tasksForDay = tasks.filter(task => task.date === currentDay);

selectedTasks.innerHTML = "";

if (tasksForDay.length === 0) {

    selectedTasks.innerHTML = "<p>No tasks for this date.</p>";

} else {

    tasksForDay.forEach(task => {

        selectedTasks.innerHTML += `
            <div class="task-item">
                ${task.completed ? "✅" : "⬜"} ${task.text}
            </div>
        `;

    });

}

        });

        calendarDays.appendChild(dayBox);

    }

}

prevMonth.addEventListener("click", function () {

    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();

});

nextMonth.addEventListener("click", function () {

    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();

});

renderCalendar();