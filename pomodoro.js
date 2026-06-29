let defaultTime = 25 * 60;
let totalTime = defaultTime;
let time = defaultTime;

let timer = null;
let running = false;
let currentMode = "focus";

const timerDisplay = document.getElementById("timer");
const progressCircle = document.getElementById("progressCircle");
const circumference = 2 * Math.PI * 100;
const sessions = document.getElementById("sessions");
const alarm = new Audio("alarm.mp3");

progressCircle.style.strokeDasharray = circumference;

function updateDisplay() {

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    timerDisplay.innerText =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    const progress = time / totalTime;

    progressCircle.style.strokeDashoffset =
        circumference * (1 - progress);

    localStorage.setItem("timeLeft", time);
    localStorage.setItem("isRunning", running);
}

function finishTimer() {

    clearInterval(timer);
    running = false;

    localStorage.removeItem("endTime");

    alarm.play();

    alert("🎉 Timer Completed!");

    if (currentMode === "focus") {

        let count = Number(localStorage.getItem("sessions")) || 0;
        count++;

        localStorage.setItem("sessions", count);
        sessions.innerText = count;

        let totalMinutes = Number(localStorage.getItem("focusTime")) || 0;
        totalMinutes += 25;

        localStorage.setItem("focusTime", totalMinutes);
    }

    time = defaultTime;
    updateDisplay();
}

document.getElementById("startBtn").onclick = function () {

    if (running) return;

    running = true;

    const endTime = Date.now() + time * 1000;
    localStorage.setItem("endTime", endTime);

    timer = setInterval(() => {

        if (time > 0) {

            time--;
            updateDisplay();

        } else {

            finishTimer();

        }

    }, 1000);

};

document.getElementById("pauseBtn").onclick = function () {

    clearInterval(timer);

    running = false;

    localStorage.removeItem("endTime");
    localStorage.setItem("timeLeft", time);

};

document.getElementById("resetBtn").onclick = function () {

    clearInterval(timer);

    running = false;

    localStorage.removeItem("endTime");

    time = defaultTime;

    updateDisplay();

};

window.onload = function () {

    const savedEndTime = localStorage.getItem("endTime");

    if (savedEndTime) {

        const remaining = Math.floor((savedEndTime - Date.now()) / 1000);

        if (remaining > 0) {

            time = remaining;
            running = true;

            timer = setInterval(() => {

                if (time > 0) {

                    time--;
                    updateDisplay();

                } else {

                    finishTimer();

                }

            }, 1000);

        } else {

            time = defaultTime;
            localStorage.removeItem("endTime");

        }

    } else {

        time = Number(localStorage.getItem("timeLeft")) || defaultTime;

    }

    updateDisplay();

    sessions.innerText = localStorage.getItem("sessions") || 0;

};

// ------------------------
// Modes
// ------------------------

document.getElementById("focusMode").onclick = function () {

    clearInterval(timer);
    running = false;

    currentMode = "focus";

    defaultTime = 25 * 60;
    totalTime = defaultTime;
    time = defaultTime;

    updateDisplay();

};

document.getElementById("shortBreak").onclick = function () {

    clearInterval(timer);
    running = false;

    currentMode = "short";

    defaultTime = 5 * 60;
    totalTime = defaultTime;
    time = defaultTime;

    updateDisplay();

};

document.getElementById("longBreak").onclick = function () {

    clearInterval(timer);
    running = false;

    currentMode = "long";

    defaultTime = 15 * 60;
    totalTime = defaultTime;
    time = defaultTime;

    updateDisplay();

};