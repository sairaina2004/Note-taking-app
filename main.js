const addBox = document.querySelector('.add-box'); 
const popupBox = document.querySelector('.popup-box'); 
const popupTitle = popupBox.querySelector('header p'); 
const closeIcon = document.querySelector('header i'); 
const titleEl = document.querySelector('input'); 
const descEl = document.querySelector('textarea'); 
const addBtn = document.querySelector('button'); 
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const notes = JSON.parse(localStorage.getItem('notes') || '[]');
let isUpdate = false;
let updateId;
function showNotes() {
    document.querySelectorAll('.note').forEach(note => note.remove());

    notes.forEach((note, index) => {
        let liEl = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${note.description}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onClick="updateNote(${index}, '${note.title}', '${note.description}')" class="uil uil-edit"></i>
                                <i onClick="deleteNote(${index})" class="uil uil-trash"></i>
                            </div>
                        </div>
                    </li>`;
        addBox.insertAdjacentHTML('afterend', liEl);
    });
}
showNotes();
function deleteNote(noteId) {
    let confirmDelete = confirm("Are you sure you want to delete this note?");
    if (!confirmDelete) return;
    notes.splice(noteId, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    showNotes();
}
function updateNote(noteId, title, desc) {
    isUpdate = true;
    updateId = noteId;

    addBox.click();
    titleEl.value = title;
    descEl.value = desc;
    addBtn.innerText = 'Edit Note';
    popupTitle.innerText = 'Editing a Note';
}
addBox.addEventListener('click', () => {
    titleEl.focus(); 
    popupBox.classList.add('show'); 
});
closeIcon.addEventListener('click', () => {
    isUpdate = false; 
    titleEl.value = ''; 
    descEl.value = ''; 
    addBtn.innerText = 'Add Note'; 
    popupTitle.innerText = 'Add a new Note'; 
    popupBox.classList.remove('show'); 
});
addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let noteTitle = titleEl.value; 
    let noteDesc = descEl.value; 
    if (noteTitle || noteDesc) {
        let dateEl = new Date();
        let month = months[dateEl.getMonth()]; 
        let day = dateEl.getDate(); 
        let year = dateEl.getFullYear(); 
        let noteInfo = {
            title: noteTitle,
            description: noteDesc,
            date: `${month} ${day} ${year}`
        };
        if (!isUpdate) {
            notes.push(noteInfo);
        } else {
            isUpdate = false; 
            notes[updateId] = noteInfo; 
        }
        localStorage.setItem('notes', JSON.stringify(notes));
        closeIcon.click();
        showNotes();
    }
});
