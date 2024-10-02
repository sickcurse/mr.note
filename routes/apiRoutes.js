const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// GET request for notes
router.get('/notes', (req, res) => {
  fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading db.json:', err);
      return res.status(500).json({ error: 'Unable to read notes' });
    }
    res.json(JSON.parse(data));
  });
});

// POST request to save a new note
router.post('/notes', (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    const newNote = { title, text, id: uuidv4() };

    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading db.json:', err);
        return res.status(500).json({ error: 'Unable to save note' });
      }
      const notes = JSON.parse(data);
      notes.push(newNote);

      fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(notes, null, 2), (err) => {
        if (err) {
          console.error('Error writing to db.json:', err);
          return res.status(500).json({ error: 'Unable to save note' });
        }
        res.json(newNote);
      });
    });
  } else {
    res.status(400).json({ message: 'Note title and text are required' });
  }
});

// DELETE request to delete a note
router.delete('/notes/:id', (req, res) => {
  const noteId = req.params.id;

  fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading db.json:', err);
      return res.status(500).json({ error: 'Unable to delete note' });
    }
    const notes = JSON.parse(data);
    const updatedNotes = notes.filter(note => note.id !== noteId);

    fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(updatedNotes, null, 2), (err) => {
      if (err) {
        console.error('Error writing to db.json:', err);
        return res.status(500).json({ error: 'Unable to delete note' });
      }
      res.json({ message: `Note ${noteId} deleted` });
    });
  });
});

module.exports = router;
