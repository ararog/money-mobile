import store from 'react-native-simple-store'

export class RestService {
    constructor(base, version) {
        this.headers = {'Content-Type': 'application/json', 'Accept-Version': version}
        store.get('token').then((token) => {
            if(token)
                this.headers['Authorization'] = 'Bearer ' + token
        });

        this.base = base
    }

    updateToken() {
        store.get('token').then((token) => {
            if(token)
                this.headers['Authorization'] = 'Bearer ' + token
        });
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
