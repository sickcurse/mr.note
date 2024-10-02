const path = require('path');
const router = require('express').Router();

router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/notes.html')); // Use relative path to the root
});

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html')); // Use relative path to the root
});


  

module.exports = router;
