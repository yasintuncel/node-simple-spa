const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser())


const checkFirstLoad = function (req, res, next) {
    if (!req.cookies.isFirstLoad) {
        res.cookie('isFirstLoad', true)
        return res.render('index', { page: req.originalUrl })
        // res.clearCookie('adiSoyadi');
    }
    next()
}

app.use(checkFirstLoad)

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

app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} numaralı portta çalışıyor.`);
});
