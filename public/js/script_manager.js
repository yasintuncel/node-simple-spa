function add(url, id) {
    return new Promise((resolve, reject) => {
        if (document.getElementById(id)) {
            resolve();
            return;
        }
        const script = document.createElement('script');
        script.src = url;
        script.id = id;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Script load error for ${url}`));
        document.body.appendChild(script);
    });
}

function remove(id) {
    const script = document.getElementById(id);
    if (script) {
        script.parentNode.removeChild(script);
    }
}

function check(id) {
    const script = document.getElementById(id);
    if (script) {
        return true
    }
    return false
}

const ScriptManager = {
    add,
    remove,
    check,
}