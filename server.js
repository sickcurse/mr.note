const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { text } = require('body-parser');
const { title } = require('process');
const app = express();
const PORT = process.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.listen(PORT, () => 
  console.log(`App listening at http://localhost:${PORT}`)
);

app.get('/notes', (req, res) => {
    res.sendFile(path.json(__dirname, 'public/index.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });
  

app.get('/api/notes', (req, res){
    fs.reradfile('./db/db.json', 'utf8', (err, data) => {
if (err) throw err;
res.json(JSON.parse(detail));
    });
});

app.post('/app/notes', (req,res ) => {
const { title && text } = req.body;
if (title && text ) {
    const newNote = {
        title,
        text,
        id: uuidv4(),

    }
}
});

fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    notes.push(newNote);

    fs.writeFile('./db/db.json', JSON.stringify(notes, null, 2), (err) => {
      if (err) throw err;
      res.json(newNote);
    });
  });
} else {
  res.status(400).send('Note title and text are required');
}
});
