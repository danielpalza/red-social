
const ROOT_URL = `${process.env.REACT_APP_API_URL}`;

export class HttpService {

    headers = {}

    constructor(url_prefix = "") {
        this.url_prefix = url_prefix
        this.getHeaders()
    }

    async get(url, queryParams) {
        try {
            console.log({url,queryParams})
            let response = await fetch(ROOT_URL + this.getUrl(url) + this.mapQueryParams(queryParams), {
                headers: this.headers
            })
            let jsonResponse = await response.json()
            return jsonResponse
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async post(url, body, queryParams = null) {
        try {
            let response = await fetch(ROOT_URL + this.getUrl(url) + this.mapQueryParams(queryParams), {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify(body)
            })

            let jsonResponse = await response.json()
            return jsonResponse
        } catch (error) {
            console.log(error);
            return null
        }

    }

    async put(url, body, queryParams = null) {
        try {
            let response = await fetch(ROOT_URL + this.getUrl(url) + this.mapQueryParams(queryParams), {
                method: "PUT",
                headers: this.headers,
                body: JSON.stringify(body)
            })
            let jsonResponse = await response.json()
            return jsonResponse
        } catch (error) {
            console.log(error);
            return null
        }
    }

    async remove(url, queryParams = null) {
        try {
            let response = await fetch(ROOT_URL + this.getUrl(url) + this.mapQueryParams(queryParams), {
                method: "DELETE",
                headers: this.headers
            })
            let jsonResponse = await response.json()
            return jsonResponse
        } catch (error) {
            console.log(error)
            return null
        }
    }

    getUrl(url) {
        return this.url_prefix + url
    }

    getHeaders() {
        this.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'app-id': process.env.REACT_APP_APP_ID
        }
        
    }

    mapQueryParams(queryParams) {
        return queryParams
            ? Object.keys(queryParams).map(function (key) {
                return key + '=' + queryParams[key]
            }).join('&')
            : ""
    }
}    