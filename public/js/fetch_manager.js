let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "X-Aequseted-With": "XMLHttpRequest",
}

const FetchManager = {
    get: function (endpoint) {
        return fetch(endpoint, {
            method: 'GET',
            credentials: 'include',
            headers,
        })
    },
    post: function (endpoint, body = {}) {
        return fetch(endpoint, {
            method: 'POST',
            credentials: 'include',
            headers,
            body: JSON.stringify(body)
        })
    },
    put: function (endpoint, body = {}) {
        return fetch(endpoint, {
            method: 'PATCH',
            credentials: 'include',
            headers,
            body: JSON.stringify(body)
        })
    },
    delete: function (endpoint) {
        return fetch(
            endpoint, {
            method: 'DELETE',
            credentials: 'include',
            headers,
            body: JSON.stringify(body)
        })
    },
    addHeader: function (key, value) {
        headers[key] = value
    },
    removeHeader: function (key) {
        delete headers[key]
    }
}