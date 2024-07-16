
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
            goPage('/')
        } else {
            console.log('form error')
        }
    }
}