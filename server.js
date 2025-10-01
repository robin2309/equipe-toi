const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Serve static assets (e.g., CSS, images)
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use('/sitemap.xml', express.static(path.join(__dirname, 'static/sitemap.xml')));
app.use('/robots.txt', express.static(path.join(__dirname, 'static/robots.txt')));

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

app.get('/sacs-evacuation', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'sacs-evacuation.html'));
});

app.get('/categories', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'categories.html'));
});

app.get('/batteries', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'batteries.html'));
});

app.get('/reserves-alimentaires', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'reserves-alimentaires.html'));
});

app.get('/radios', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'radios.html'));
});

app.get('/divers', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'divers.html'));
});

// Fallback for 404
app.use((req, res) => {
  res.status(404).send('Page non trouvée');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
