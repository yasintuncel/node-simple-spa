const layoutTypes = {
    empty: 0,
    admin: 1,
}

let currentLayout = null

async function updateSidebar() {
    let menus = await (await FetchManager.get(`/partials/sidebarMenus`)).json()
    let sidebarItem = await (await FetchManager.get('/components/sidebar/item.ejs')).text()
    let dividerItem = await (await FetchManager.get('/components/sidebar/divider.ejs')).text()

    document.getElementById('sidebarMenu').innerHTML = ''
    menus.map(e =>
        document.getElementById('sidebarMenu').innerHTML += e.title == 'divider' ? ejs.render(dividerItem) : ejs.render(sidebarItem, e)
    )
}

async function setLayoutToAdmin() {
    if (currentLayout == layoutTypes.admin)
        return

    let layout = await FetchManager.get('/layouts/adminLayout.ejs')
    document.getElementById('app').innerHTML = await layout.text()

    await updateSidebar()
    currentLayout = layoutTypes.admin
}

function setLayoutToEmpty() {
    if (currentLayout == layoutTypes.empty)
        return
    document.getElementById('app').innerHTML = `<div id="content"></div>`
    currentLayout = layoutTypes.empty
}

const layouts = {
    [layoutTypes.empty]: setLayoutToEmpty,
    [layoutTypes.admin]: setLayoutToAdmin,
}

function setLayout(type) {
    if (type == currentLayout) return;
    layouts[type]()
}

const LayoutManager = {
    setLayout,
}