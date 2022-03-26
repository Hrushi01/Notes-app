var arr = [];
var generatedId = 1;


if (localStorage.getItem("notesData") !== null) {
    arr = JSON.parse(localStorage.getItem("notesData"));
    generatedId = arr[arr.length - 1].id + 1;
    loadData();
}


function setNotes() {
    window.localStorage.setItem("notesData", JSON.stringify(arr));
}


function loadData() {
    arr.forEach(function(notecur) {
        var note = document.createElement("div");
        note.classList.add("note")


        var deleteNote = document.createElement("i")
        deleteNote.classList.add("fa-solid")
        deleteNote.classList.add("fa-trash")
        deleteNote.setAttribute('dataid', generatedId)
        deleteNote.onclick = deleteNoteFunc;


        var title = document.createElement("input");
        title.setAttribute("placeholder", "title here");
        title.setAttribute("type", "text");
        title.classList.add("title");
        title.setAttribute('dataid', notecur.id)
        title.value = notecur.title
        title.onkeyup = updateTitle


        var content = document.createElement("textarea");
        content.setAttribute("placeholder", "content here");
        content.setAttribute("cols", "30");
        content.setAttribute("rows", "10");
        content.setAttribute('dataid', notecur.id)
        content.classList.add("content");
        content.value = notecur.content
        content.onkeyup = updateContent


        document.getElementById("notes").appendChild(note);
        note.appendChild(title);
        note.appendChild(content);
        note.appendChild(deleteNote);
    })
}


function newNote() {
    var note = document.createElement("div");
    note.classList.add("note");

    var deleteNote = document.createElement("i")
    deleteNote.classList.add("fa-solid")
    deleteNote.classList.add("fa-trash")
    deleteNote.setAttribute('dataid', generatedId)
    deleteNote.onclick = deleteNoteFunc;


    var title = document.createElement("input");
    title.setAttribute("placeholder", "title here");
    title.setAttribute("type", "text");
    title.classList.add("title");
    title.setAttribute('dataid', generatedId)
    title.onkeyup = updateTitle

    var content = document.createElement("textarea");
    content.setAttribute("placeholder", "content here");
    content.setAttribute("cols", "30");
    content.setAttribute("rows", "11");
    content.setAttribute('dataid', generatedId)
    content.classList.add("content");
    content.onkeyup = updateContent

    document.getElementById("notes").appendChild(note);
    note.appendChild(title);
    note.appendChild(content);
    note.appendChild(deleteNote);

    arr.push({
        id: generatedId,
        title: "",
        content: ""
    })


    generatedId++;

}




function updateTitle() {

    var title = this.value
    var thisId = Number(this.getAttribute('dataid'))

    var object = arr.find(function(note, index) {
        return note.id === thisId;
    })

    object.title = title;

    setNotes()
    console.log(arr)
}




function updateContent() {

    var content = this.value
    var contId = Number(this.getAttribute('dataid'))

    object = arr.find(function(note, index) {
        return note.id === contId;
    })

    object.content = content;

    setNotes()
    console.log(arr)
}




function deleteNoteFunc() {

    var delId = Number(this.getAttribute("dataid"));
    var delIndex = arr.findIndex(function(note) {
        return note.id === delId;
    })

    arr.splice(delIndex, 1)
    this.parentNode.remove();


    setNotes()
    console.log(arr)
}

document.querySelector(".dark-btn").addEventListener("click", function() {
    console.log('dark');
    document.body.querySelector("section").classList.toggle("darkSection")
})