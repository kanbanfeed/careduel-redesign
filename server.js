require('dotenv').config();
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

// --- VERCEL VIEW ENGINE FIX ---
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// --- CONFIG ---
app.use(expressLayouts);
app.set('layout', 'layout');
app.use(express.static(path.join(__dirname, 'public')));

// --- MIDDLEWARE: Default Layout Settings ---
app.use((req, res, next) => {
    res.locals.hideLayout = false; // Show Header/Footer by default
    next();
});

// --- ROUTES ---

// 1. Landing Page
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

// 2. Login (Hide Header/Footer)
app.get('/login', (req, res) => {
    res.render('login', { title: 'Login', hideLayout: true });
});

// 3. Dashboard (Protected)
app.get('/dashboard', (req, res) => {
    res.render('dashboard', { title: 'Provider Portal' });
});

// --- SERVER STARTUP ---
const PORT = process.env.PORT || 5000;

if (require.main === module) {
    app.listen(PORT, () => console.log(`CAREDUEL running on http://localhost:${PORT}`));
}

module.exports = app;