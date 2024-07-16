const layouts = {
    admin: `<div id="topbar"></div><div id="sidebar"></div><div id="content"></div>`,
    empty: `<div id="content"></div>`
}

async function setLayoutToAdmin() {
    document.getElementById('app').innerHTML = layouts.admin

    let topbarRes = await FetchManager.get(`/partials/topbar`)
    document.getElementById('topbar').innerHTML = await topbarRes.text()

    let sidebarRes = await FetchManager.get(`/partials/sidebar`)
    document.getElementById('sidebar').innerHTML = await sidebarRes.text()
}

function setLayoutToEmpty() {
    document.getElementById('app').innerHTML = layouts.empty
}