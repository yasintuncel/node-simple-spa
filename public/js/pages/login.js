
function setLoginPage() {
    setLayoutToEmpty()
    window.history.pushState({}, '', '/login');
    document.getElementById('content').innerHTML = `
        <link rel="stylesheet" href="/css/login.css">
        `
    document.getElementById('content').innerHTML += `
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