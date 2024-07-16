const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // HTTPS kullanıyorsanız, true yapın
}))


const users = [
    { username: 'user', password: '123456' },
    { username: 'user2', password: '123456' },
]

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

app.get('/partials/sidebar', (req, res) => {
    res.send(`
    <nav>
      <ul>
        <li><button onclick="goPage('/')">Home</button></li>
        <li><button onclick="goPage('/about')">About</button></li>
        <li><button onclick="goPage('/contact')">Contact</button></li>
        <li><button onclick="onClickLogout()">Logout</button></li>
      </ul>
    </nav>
`)
})

app.get('/partials/topbar', (req, res) => {
    res.send(`
  <header>
    <h1>Node - Single Page Application</h1>
  </header>
`)
})

app.get('/login', (req, res) => {
    res.send(`
    <h1>Login</h1>
    <form id="loginForm">
        <input type='text' name='username' placeholder='Username' required>
        <input type='password' name='password' placeholder='Password' required>
    </form>
    <button onclick="onClickLogin()">Login</button>
`)
})

app.get('/check-session', (req, res) => {
    if (req.session.user) {
        res.json({ isLogged: true });
    } else {
        res.json({ isLogged: false });
    }
});

app.post('/login', (req, res) => {
    const { username, password } = req.body
    let user = users.find(e => e.username == username && e.password == password)

    if (user) {
        req.session.user = user;
        res.status(200).send('login success');
    } else {
        res.status(404).send('Invalid username or password');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(400).send('Error logging out')
        }
        return res.status(200).send('logout succesfuly')
    });
});

app.get('*', (req, res) => {
    res.send(`
        <h2>404</h2>
        <p>Page not found</p>
`)
})

app.listen(PORT, () => {
    console.log('Server running on : http://localhost:' + PORT);
});
