const express = require('express');
const path = require('path');
const api = require('./routes/note.js');

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/notes', api);
app.use(express.static('public'));

// Get routes
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Wildcard route to direct users back to home page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);