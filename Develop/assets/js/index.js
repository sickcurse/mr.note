let noteTitle = document.querySelector('.note-title');
let noteText = document.querySelector('.note-textarea');
let saveNoteBtn = document.querySelector('.save-note');
let newNoteBtn = document.querySelector('.new-note');
let clearBtn = document.querySelector('.clear-btn');
let noteList = document.querySelector('#list-group');

const saveNote = (note) => {
  return fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });
};

const getNotes = () => {
  return fetch('/api/notes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const deleteNote = (id) => {
  return fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const handleNoteSave = () => {
  const newNote = {
    title: noteTitle.value,
    text: noteText.value,
  };

  if (newNote.title && newNote.text) {
    saveNote(newNote)
      .then(() => {
        noteTitle.value = '';
        noteText.value = '';
        getAndRenderNotes();
      })
      .catch((err) => console.error(err));
  } else {
    alert('Please fill out both fields!');
  }
};

const handleNewNoteView = () => {
  noteTitle.value = '';
  noteText.value = '';
  activeNote = {};
};

const handleClearForm = () => {
  noteTitle.value = '';
  noteText.value = '';
};

const renderNoteList = async (notes) => {
  let jsonNotes = await notes.json();
  noteList.innerHTML = '';

  jsonNotes.forEach((note) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.textContent = note.title;
    li.addEventListener('click', () => {
      noteTitle.value = note.title;
      noteText.value = note.text;
    });
    noteList.appendChild(li);
  });
};

const getAndRenderNotes = () => {
  getNotes().then(renderNoteList);
};

saveNoteBtn.addEventListener('click', (event) => {
  event.preventDefault();
  handleNoteSave();
});

newNoteBtn.addEventListener('click', (event) => {
  event.preventDefault();
  handleNewNoteView();
});

clearBtn.addEventListener('click', (event) => {
  event.preventDefault();
  handleClearForm();
});

getAndRenderNotes();
