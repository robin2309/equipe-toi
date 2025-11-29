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
// Serve JSON product data
app.use('/data', express.static(path.join(__dirname, 'data')));

// Load partials (nav/footer) once at startup
let navHtml = '';
let footerHtml = '';
let headHtml = '';
let ctaHtml = '';
let aboutHtml = '';
let headCommonHtml = '';
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
try {
  ctaHtml = fs.readFileSync(path.join(__dirname, 'src', 'partials', 'cta.html'), 'utf8');
} catch (err) {
  console.warn('cta partial not found:', err.message);
}
try {
  aboutHtml = fs.readFileSync(path.join(__dirname, 'src', 'partials', 'about.html'), 'utf8');
} catch (err) {
  console.warn('about partial not found:', err.message);
}
try {
  headCommonHtml = fs.readFileSync(path.join(__dirname, 'src', 'partials', 'head-common.html'), 'utf8');
} catch (err) {
  console.warn('head-common partial not found:', err.message);
}

function renderPage(res, pageFilePath) {
  fs.readFile(pageFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading page:', pageFilePath, err);
      return res.status(500).send('Erreur serveur');
    }

  // Insert head-common and analytics/head partials before closing </head>
  let out = data.replace(/<\/head>/i, (headCommonHtml || '') + '\n' + (headHtml || '') + '\n</head>');

    // Insert nav after the opening <body> tag
    out = out.replace(/<body([^>]*)>/i, (match) => {
      return match + '\n' + navHtml;
    });

    // Replace CTA and About placeholders if present
    out = out.replace(/<!--\s*inject:cta\s*-->/ig, ctaHtml);
    out = out.replace(/<!--\s*inject:about\s*-->/ig, aboutHtml);

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
