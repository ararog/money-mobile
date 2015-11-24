export class RestService {
    constructor(base, version) {

        var headers = { 'Content-Type': 'application/json', 'Accept-Version': version}
        if(localStorage.getItem('token'))
        headers['Authorization'] = 'Bearer ' + localStorage.getItem('token')

        this.base = base
    }

    post(path, data) {
        return fetch(this.base + path, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        })
    }

    get(path, data) {
        return fetch(this.base + path, {
            method: 'GET',
            headers: headers
        })
    }

    delete(path, data) {
        return fetch(this.base + path, {
            method: 'DELETE',
            headers: headers
        })
    }

    put(path, data) {
        return fetch(this.base + path, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(data)
        })
    }
}
