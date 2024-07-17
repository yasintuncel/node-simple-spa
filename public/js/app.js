
function getFormBody(formId) {
    var form = document.getElementById(formId)
    var formData = new FormData(form)
    return Object.fromEntries(
        Array.from(formData.keys()).map(key => [
            key, formData.getAll(key).length > 1 ?
                formData.getAll(key) : formData.get(key)
        ]))
}
