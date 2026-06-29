const themeBtn = document.getElementById("themeBtn");

if (themeBtn) {

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        themeBtn.textContent = "☀️";
    }

    themeBtn.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            themeBtn.textContent = "☀️";
        } else {
            localStorage.setItem("theme", "light");
            themeBtn.textContent = "🌙";
        }

    });

}