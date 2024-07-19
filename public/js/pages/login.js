function setLoginPage() {
    setLayoutToEmpty()
    window.history.pushState({}, '', '/login');
    document.getElementById('content').innerHTML += `
        <link rel="stylesheet" href="/css/login.css">
        <form id="loginForm" class="p-4">
            <h2>Login to</h2>
            <h1>SimpleSPA</h1>
            <p class="text-center text-muted">(u:user, p:123456)</p>
            <div class="mb-3">
                <input type="text" name="username" class="form-control" placeholder="Username" required>
            </div>
            <div class="mb-3">
                <input type="password" name="password" class="form-control" placeholder="Password" required>
            </div>
            <button type="button" class="btn btn-primary" onclick="onClickLogin()">Login</button>
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