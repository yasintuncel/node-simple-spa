const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

const checkAppLoaded = function (req, res, next) {
    // app-loaded value doesn't matter true or false
    // important thing is if it's there or not.
    if (!req.headers['app-loaded']) {
        return res.render('index')
    }
    next()
}

app.use(checkAppLoaded)

app.get('/', (req, res) => {
    res.send(`<h2>Welcome to the Home Page</h2>
<p>This is the content of the home page.</p>`)
})

app.get('/about', (req, res) => {
    res.send(`<h2>About Us</h2>
<p>This is the about page content.</p>
`)
})

app.get('/contact', (req, res) => {
    res.send(`<h2>Contact Us</h2>
<p>This is the contact page content.</p>
`)
})

app.get('*', (req, res) => {
    res.send(`<h2>404</h2>
<p>Page not found</p>
`)
})

app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} numaralı portta çalışıyor.`);
});
