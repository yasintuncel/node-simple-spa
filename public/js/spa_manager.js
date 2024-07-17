let appLoadedFlag = false
FetchManager.addHeader('app-loaded', appLoadedFlag)

async function goPage(page, goBack = false) {
    let res = await FetchManager.get(page)
    document.getElementById('content').innerHTML = await res.text()
    if (!goBack) {
        window.history.pushState(null, null, page);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    appLoadedFlag = true

    window.addEventListener('popstate', () => {
        goPage(window.location.pathname, true)
    })

    let sessionRes = await FetchManager.get(`/check-session`)
    let sessionJson = await sessionRes.json()

    if (sessionJson.isLogged) {
        setLayoutToAdmin()
        goPage(window.location.pathname)
    }
    else {
        setLoginPage()
    }
})
