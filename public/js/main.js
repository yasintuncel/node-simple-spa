const contentElement = document.getElementById('content')

let appLoadedFlag = false
FetchManager.addHeader('app-loaded', appLoadedFlag)


async function loadComponent(link, element) {
    let res = await FetchManager.get(`/components/${link}`)
    document.getElementById(element).innerHTML = await res.text()
}

async function loadContent(page) {
    let res = await FetchManager.get(page)
    contentElement.innerHTML = await res.text()
}

document.addEventListener('DOMContentLoaded', () => {
    appLoadedFlag = true

    window.addEventListener('popstate', () => {
        loadContent(window.location.pathname)
    })
    loadComponent('sidebar', 'sidebar')
    loadContent(window.location.pathname)
})