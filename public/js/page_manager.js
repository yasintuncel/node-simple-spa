
// async function setLoginPage() {
//     setLayoutToEmpty()
//     window.history.pushState(null, null, '/login');
//     let loginHtml = await (await FetchManager.get('/ejs/pages/login/login.ejs')).text()
//     document.getElementById('content').innerHTML = loginHtml
//     StyleManager.add('/ejs/pages/login/login.css', 'loginCSS')
//     ScriptManager.add('/ejs/pages/login/login.js', 'loginJS')
// }
const pageFolder = '/pages'

const pages = {
    login: {
        name: 'login',
        folder: 'login',
        html: 'login.ejs',
        js: 'login.js',
        css: 'login.css',
        render: false,
        layout: layoutTypes.empty,
    },
    dashboard: {
        name: 'dashboard',
        html: '',
    },
    about: {
        name: 'about',
        html: 'about',
    },
    contact: {
        name: 'contact',
        html: 'contact',
    },
}

let currentPage = pages.login

async function goPage(page) {
    // set layout of page
    LayoutManager.setLayout(page.layout == null ? layoutTypes.admin : page.layout)

    // remove css and js of previous page
    StyleManager.remove(`${pageFolder}/${currentPage.folder}/${page.css}`, `css_${page.name}`)
    ScriptManager.remove(`${pageFolder}/${currentPage.folder}/${page.js}`, `js_${page.name}`)

    // add css and js of new page
    StyleManager.add(`${pageFolder}/${page.folder}/${page.css}`, `css_${page.name}`)
    ScriptManager.add(`${pageFolder}/${page.folder}/${page.js}`, `js_${page.name}`)

    // update content
    if (page.render) {
        let res = await (await FetchManager.get(`${page.html}`)).json()
        document.getElementById('content').innerHTML = ejs.render(`${pageFolder}/${page.folder}/${page.html}`, res)
    }
    else {
        document.getElementById('content').innerHTML = await (await FetchManager.get(`${pageFolder}/${page.folder}/${page.html}`)).text()
    }
    currentPage = page
}