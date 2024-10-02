const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


// Routes
app.use('/api', apiRoutes);  // Handles API routes
app.use('/', htmlRoutes);    // Handles HTML routes

// Start the server
app.listen(PORT, () => 
  console.log(`App listening at http://localhost:${PORT}`)
);
