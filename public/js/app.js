
function getFormBody(formId) {
    var form = document.getElementById(formId)
    var formData = new FormData(form)
    return Object.fromEntries(
        Array.from(formData.keys()).map(key => [
            key, formData.getAll(key).length > 1 ?
                formData.getAll(key) : formData.get(key)
        ]))
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
        setLayoutToEmpty()
        goPage('/login')
    } else {
        console.log('form error')
    }
}