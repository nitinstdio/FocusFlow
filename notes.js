const noteInput = document.getElementById("noteInput");
const saveNote = document.getElementById("saveNote");
const notesContainer = document.getElementById("notesContainer");

function saveNotes() {

    const notes = [];

    document.querySelectorAll(".note-card").forEach(note => {

        notes.push({
            text: note.querySelector("p").innerText,
            color: [...note.classList].find(c =>
                ["note-yellow", "note-blue", "note-green", "note-pink"].includes(c)
            )
        });

    });

    localStorage.setItem("notes", JSON.stringify(notes));

}

function createNote(noteText, color = null) {

    const note = document.createElement("div");
    note.classList.add("note-card");

    const colors = [
        "note-yellow",
        "note-blue",
        "note-green",
        "note-pink"
    ];

    // Use saved color or assign the next one in sequence
    if (color) {
        note.classList.add(color);
    } else {
        const colorIndex = document.querySelectorAll(".note-card").length % colors.length;
        note.classList.add(colors[colorIndex]);
    }

    note.innerHTML = `
        <p>${noteText}</p>
        <button class="deleteNote">🗑️</button>
    `;

    note.querySelector(".deleteNote").addEventListener("click", function () {
        note.remove();
        saveNotes();
    });

    notesContainer.appendChild(note);
    saveNotes();
}

saveNote.addEventListener("click", function () {

    if (noteInput.value.trim() === "") return;

    createNote(noteInput.value);

    noteInput.value = "";

});

noteInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        saveNote.click();
    }

});

window.onload = function () {

    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];

    savedNotes.forEach(note => {

        // Support both old notes (text only) and new notes (text + color)
        if (typeof note === "string") {
            createNote(note);
        } else {
            createNote(note.text, note.color);
        }

    });

};