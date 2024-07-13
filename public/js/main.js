document.addEventListener('DOMContentLoaded', () => {
    const contentElement = document.getElementById('content');

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

    function loadContent(page) {
        fetch(page, {
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
            .then(response => response.text())
            .then(html => {
                contentElement.innerHTML = html;
            })
            .catch(err => console.error('Error:', err));
    }

    // İlk yüklemede doğru içeriği yükle
    if (window.location.pathname !== '/') {
        loadContent(window.location.pathname);
    }
});


if (!localStorage.getItem('tabToken')) {
    localStorage.setItem('tabToken', '${uuidv4()}');
}
fetch('/check-tab', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token: localStorage.getItem('tabToken') })
})
    .then(response => response.json())
    .then(data => {
        document.body.innerHTML += '<p>' + data.message + '</p>';
    });