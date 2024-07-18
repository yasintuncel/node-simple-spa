async function onClickLogin() {
    let form = document.getElementById('loginForm')
    let isValid = form.reportValidity();

    if (isValid) {
        var body = getFormBody('loginForm')
        let res = await FetchManager.post('/login', body)

        if (res.status == 200) {
            goPage(pages.dashboard)
        } else {
            console.log('form error')
        }
    }
}