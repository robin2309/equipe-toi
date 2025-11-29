const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

// Serve static assets (e.g., CSS, images)
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use('/sitemap.xml', express.static(path.join(__dirname, 'static/sitemap.xml')));
app.use('/robots.txt', express.static(path.join(__dirname, 'static/robots.txt')));

// Load partials (nav/footer) once at startup
let navHtml = '';
let footerHtml = '';
let headHtml = '';
try {
  navHtml = fs.readFileSync(path.join(__dirname, 'src', 'partials', 'nav.html'), 'utf8');
} catch (err) {
  console.warn('nav partial not found:', err.message);
}
try {
  footerHtml = fs.readFileSync(path.join(__dirname, 'src', 'partials', 'footer.html'), 'utf8');
} catch (err) {
  console.warn('footer partial not found:', err.message);
}
try {
  headHtml = fs.readFileSync(path.join(__dirname, 'src', 'partials', 'analytics.html'), 'utf8');
} catch (err) {
  console.warn('analytics partial not found:', err.message);
}

function renderPage(res, pageFilePath) {
  fs.readFile(pageFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading page:', pageFilePath, err);
      return res.status(500).send('Erreur serveur');
    }

    // Insert analytics/head partial before closing </head>
    let out = data.replace(/<\/head>/i, headHtml + '\n</head>');

    // Insert nav after the opening <body> tag
    out = out.replace(/<body([^>]*)>/i, (match) => {
      return match + '\n' + navHtml;
    });

    // Insert footer before closing </body>
    out = out.replace(/<\/body>/i, footerHtml + '\n</body>');

    res.send(out);
  });
}

// Routes using renderPage so nav/footer partials are injected
app.get('/', (req, res) => {
  renderPage(res, path.join(__dirname, 'src', 'index.html'));
});

app.get('/trousse-secours', (req, res) => {
  renderPage(res, path.join(__dirname, 'src', 'trousse-secours.html'));
});

app.get('/sacs-evacuation', (req, res) => {
  renderPage(res, path.join(__dirname, 'src', 'sacs-evacuation.html'));
});

app.get('/categories', (req, res) => {
  renderPage(res, path.join(__dirname, 'src', 'categories.html'));
});

app.get('/batteries', (req, res) => {
  renderPage(res, path.join(__dirname, 'src', 'batteries.html'));
});

app.get('/reserves-alimentaires', (req, res) => {
  renderPage(res, path.join(__dirname, 'src', 'reserves-alimentaires.html'));
});

app.get('/radios', (req, res) => {
  renderPage(res, path.join(__dirname, 'src', 'radios.html'));
});

app.get('/divers', (req, res) => {
  renderPage(res, path.join(__dirname, 'src', 'divers.html'));
});

// Fallback for 404
app.use((req, res) => {
  res.status(404).send('Page non trouvée');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
