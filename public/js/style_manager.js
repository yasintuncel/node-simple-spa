function add(url, id) {
    return new Promise((resolve, reject) => {
        if (document.getElementById(id)) {
            resolve();
            return;
        }
        const link = document.createElement('link');
        link.href = url;
        link.id = id;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.onload = () => resolve();
        link.onerror = () => reject(new Error(`CSS load error for ${url}`));
        document.head.appendChild(link);
    });
}

function remove(id) {
    const link = document.getElementById(id);
    if (link) {
        link.parentNode.removeChild(link);
    }
}

function check(id) {
    const link = document.getElementById(id);
    if (link) {
        return true
    }
    return false
}

const StyleManager = {
    add,
    remove,
    check,
}