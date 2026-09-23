document.addEventListener('DOMContentLoaded', () => {
  const titleInput = document.getElementById('note-title');
  const contentInput = document.getElementById('note-content');
  const addBtn = document.getElementById('add-note-btn');
  const notesList = document.getElementById('notes-list');

  loadNotes();

  addBtn.addEventListener('click', () => {
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (!title || !content) {
      alert('Please fill out both fields.');
      return;
    }

    const newNote = {
      id: Date.now(),
      title: title,
      content: content
    };

    saveNoteToStorage(newNote);
    renderNotes();

    titleInput.value = '';
    contentInput.value = '';
  });

  function getNotesFromStorage() {
    return JSON.parse(localStorage.getItem('notes')) || [];
  }

  function saveNoteToStorage(note) {
    const notes = getNotesFromStorage();
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
  }

  function deleteNote(id) {
    let notes = getNotesFromStorage();
    notes = notes.filter(note => note.id !== id);
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes();
  }

  function loadNotes() {
    renderNotes();
  }

  function renderNotes() {
    notesList.innerHTML = '';
    const notes = getNotesFromStorage();

    if (notes.length === 0) {
      notesList.innerHTML = '<p style="text-align:center; color:#888;">No notes available.</p>';
      return;
    }

    notes.forEach(note => {
      const card = document.createElement('div');
      card.className = 'note-card';

      const details = document.createElement('div');
      details.className = 'note-details';

      const h3 = document.createElement('h3');
      h3.textContent = note.title;

      const p = document.createElement('p');
      p.textContent = note.content;

      details.appendChild(h3);
      details.appendChild(p);

      const delBtn = document.createElement('button');
      delBtn.className = 'delete-btn';
      delBtn.textContent = 'Delete';
      delBtn.addEventListener('click', () => deleteNote(note.id));

      card.appendChild(details);
      card.appendChild(delBtn);

      notesList.appendChild(card);
    });
  }
});