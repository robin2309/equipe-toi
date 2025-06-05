const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static assets (e.g., CSS, images)
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/img', express.static(path.join(__dirname, 'img')));

// Route for home
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'src', 'wip.html'));
// });
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.get('/trousse-secours', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'trousse-secours.html'));
});

app.get('/categories', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'categories.html'));
});

// Fallback for 404
app.use((req, res) => {
  res.status(404).send('Page non trouvée');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
