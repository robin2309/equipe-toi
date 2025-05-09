const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static assets (e.g., CSS, images)
app.use('/css', express.static(path.join(__dirname, 'css')));

// Route for home
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

// Route for /trousse-secours
app.get('/trousse-secours', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'trousse-secours.html'));
});

// Fallback for 404
app.use((req, res) => {
  res.status(404).send('Page non trouvée');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
