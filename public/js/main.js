const contentElement = document.getElementById('content');

function loadContent(page) {
    fetch(page, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "X-Aequseted-With": "XMLHttpRequest",
            'app-loaded': appLoadedFlag
        }
    })
        .then(response => response.text())
        .then(html => {
            contentElement.innerHTML = html;
        })
        .catch(err => console.error('Error:', err));
}

let appLoadedFlag = false

document.addEventListener('DOMContentLoaded', () => {
    appLoadedFlag = true

    document.querySelectorAll('a[data-link]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const url = e.target.href;
            window.history.pushState({}, '', url);
            loadContent(url);
        });
    });

    window.addEventListener('popstate', () => {
        loadContent(window.location.pathname);
    });

    loadContent(window.location.pathname);
});