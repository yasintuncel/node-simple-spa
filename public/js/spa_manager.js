const contentElement = document.getElementById('content')

let appLoadedFlag = false
FetchManager.addHeader('app-loaded', appLoadedFlag)

async function goPage(page, goBack = false) {
    let res = await FetchManager.get(page)
    contentElement.innerHTML = await res.text()
    if (!goBack) {
        window.history.pushState({}, '', page);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    appLoadedFlag = true

    window.addEventListener('popstate', () => {
        goPage(window.location.pathname, true)
    })

    let topbarRes = await FetchManager.get(`/partials/topbar`)
    document.getElementById('topbar').innerHTML = await topbarRes.text()

    let sidebarRes = await FetchManager.get(`/partials/sidebar`)
    document.getElementById('sidebar').innerHTML = await sidebarRes.text()

    goPage(window.location.pathname)
})