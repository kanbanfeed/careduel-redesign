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

app.get('/login', (req, res) => {
    
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.get('host');
    const baseUrl = `${protocol}://${host}`;
    
    
    const returnUrl = `${baseUrl}/auth/callback`;
    
    
    const encodedUrl = encodeURIComponent(returnUrl);
    
    // 4. Redirect to Crowbar Master Login
   
    res.redirect(`https://www.crowbarltd.com/login?redirect_to=${encodedUrl}`);
});

app.get('/auth/callback', (req, res) => {
    res.render('callback', { title: 'Syncing Identity...' });
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