const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'Develop/assets')));

app.listen(PORT, () => 
  console.log(`App listening at http://localhost:${PORT}`)
);

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/api/notes', (req, res) => {
  fs.readFile(path.join(__dirname, './Develop/db/db.json'), 'utf8', (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

app.post('/api/notes', (req, res) => {
  const { title, text } = req.body;
  
  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    fs.readFile(path.join(__dirname, './Develop/db/db.json'), 'utf8', (err, data) => {
      if (err) throw err;
      const notes = JSON.parse(data);
      notes.push(newNote);

      fs.writeFile(path.join(__dirname, './Develop/db/db.json'), JSON.stringify(notes, null, 2), (err) => {
        if (err) throw err;
        res.json(newNote);
      });
    });
  } else {
    res.status(400).json({ message: 'Note title and text are required' });
  }
});

app.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.id;

  fs.readFile(path.join(__dirname, './Develop/db/db.json'), 'utf8', (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    const updatedNotes = notes.filter(note => note.id !== noteId);

    fs.writeFile(path.join(__dirname, './Develop/db/db.json'), JSON.stringify(updatedNotes, null, 2), (err) => {
      if (err) throw err;
      res.json({ message: `Note ${noteId} deleted` });
    });
  });
});
