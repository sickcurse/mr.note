const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
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
    res.
}
)