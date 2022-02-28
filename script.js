var addNote = document.querySelector(".noteAddButton");
showNotes();
addNote.addEventListener("click", () => {
    let enteredNote = document.querySelector(".noteAddArea").value;
    let enteredTitle = document.querySelector("#title").value;
    let noteFromLocalStorage = localStorage.getItem("takenNote");
    if (noteFromLocalStorage == null) {
        notesArr = [];
    } else {
        notesArr = JSON.parse(noteFromLocalStorage);
    }
    if (enteredTitle != "" && enteredNote != "") {
        let myData = {
            title: enteredTitle,
            notes: enteredNote
        }
        notesArr.push(myData);
    };
    localStorage.setItem("takenNote", JSON.stringify(notesArr));
    document.querySelector(".noteAddArea").value = "";
    document.querySelector("#title").value = "";
    showNotes();
})

function showNotes() {
    let notes = localStorage.getItem("takenNote");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function(element, index) {
        html += ` 
        <div class="noteItem">
        <div class="noteItemTopic">${element.title}</div>
        <div class="noteItemContent">${element.notes}</div>
        <button id="${index}" onclick="deleteNote(this.id)" class="noteDeleteButton">Delete</button>
    </div> `;
    });
    let notesElm = document.querySelector(".noteShowMain");
    if (notesObj.length != 0) {
        return notesElm.innerHTML = html;
    } else {
        return notesElm.innerHTML = "Nothing to show!!! At first, add a note...";
    };
}

function deleteNote(index) {
    let notes = localStorage.getItem("takenNote");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("takenNote", JSON.stringify(notesObj));
    showNotes();
}
document.getElementById("searchThis").addEventListener("input", () => {
    let search = document.getElementById("searchThis").value.toLowerCase();

    var n = 0;
    let element = document.querySelectorAll(".noteItem");
    element.forEach(elem => {
        let text = elem.querySelector(".noteItemContent").innerText.toLowerCase();
        let text2 = elem.querySelector(".noteItemTopic").innerText.toLowerCase();
        if (text.includes(search) || text2.includes(search)) {

            n += 1;
            elem.style.display = "flex";
            document.querySelector(".message").style.display = "none";

        } else {
            elem.style.display = "none";
            if (n == 0) {
                document.querySelector(".message").style.display = "flex";
            } else {
                document.querySelector(".message").style.display = "none";
            }
        }
    })

})