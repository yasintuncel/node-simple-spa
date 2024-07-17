function setLoginPage() {
    setLayoutToEmpty()
    window.history.pushState({}, '', '/login');
    document.getElementById('content').innerHTML += `
        <link rel="stylesheet" href="/css/login.css">
        <form id="loginForm">
            <h2>Login to</h2>
            <h1>SimpleSPA</h1>
            <p>(u:user, p:123456)</p>

            <input type='text' name='username' placeholder='Username' required>
            <input type='password' name='password' placeholder='Password' required>
            <button type="button" onclick="onClickLogin()">Login</button>
        </form>
        `
}

async function onClickLogin() {
    let form = document.getElementById('loginForm')
    let isValid = form.reportValidity();

    if (isValid) {
        var body = getFormBody('loginForm')
        let res = await FetchManager.post('/login', body)

        if (res.status == 200) {
            setLayoutToAdmin()
            goPage('/')
        } else {
            console.log('form error')
        }
    }
}

async function onClickLogout() {
    let res = await FetchManager.get('/logout')

    if (res.status == 200) {
        setLoginPage()
    } else {
        console.log('form error')
    }
}