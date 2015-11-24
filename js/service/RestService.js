export class RestService {
    constructor(base, version) {

        var headers = { 'Content-Type': 'application/json', 'Accept-Version': version}
        if(localStorage.getItem('token'))
            headers['Authorization'] = 'Bearer ' + localStorage.getItem('token')

        this.headers = headers
        this.base = base
    }

    post(path, data) {
        return fetch(this.base + path, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(data)
        })
    }

    get(path, data) {
        return fetch(this.base + path, {
            method: 'GET',
            headers: this.headers,
            body: JSON.stringify(data)
        })
    }

    delete(path, data) {
        return fetch(this.base + path, {
            method: 'DELETE',
            headers: this.headers
        })
    }

    put(path, data) {
        return fetch(this.base + path, {
            method: 'PUT',
            headers: this.headers,
            body: JSON.stringify(data)
        })
    }
}
