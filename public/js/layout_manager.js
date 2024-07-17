const layouts = {
    empty: `<div id="content"></div>`
}

async function updateSidebar() {
    let menus = await (await FetchManager.get(`/partials/sidebarMenus`)).json()
    let sidebarItem = await (await FetchManager.get('/templates/components/sidebar/item.ejs')).text()
    let dividerItem = await (await FetchManager.get('/templates/components/sidebar/divider.ejs')).text()

    document.getElementById('sidebarMenu').innerHTML = ''
    menus.map(e =>
        document.getElementById('sidebarMenu').innerHTML += e.title == 'divider' ? ejs.render(dividerItem) : ejs.render(sidebarItem, e)
    )
}

async function setLayoutToAdmin() {
    let layout = await FetchManager.get('/templates/layouts/adminLayout.ejs')
    document.getElementById('app').innerHTML = await layout.text()

    // let topbarRes = await FetchManager.get(`/partials/topbar`)
    // document.getElementById('topbar').innerHTML = await topbarRes.text()
    await updateSidebar()
}

function setLayoutToEmpty() {
    document.getElementById('app').innerHTML = layouts.empty
}