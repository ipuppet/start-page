import axios from "axios"

class LocalData {
    get(name, _default = null) {
        if (localStorage.getItem(name + "_obj")) {
            const data = JSON.parse(localStorage.getItem(name + "_obj"))
            const newDate = new Date().getTime()
            if (data.life === undefined) data.life = newDate + 1
            if (newDate <= data.life)
                return data.obj
            else {
                this.remove(name)
                return _default
            }
        } else if (localStorage.getItem(name + "_str")) {
            return localStorage.getItem(name + "_str")
        } else {
            return _default
        }
    }

    /**
     *
     * @param name
     * @param obj
     * @param life 有效期 秒
     * @returns {boolean}
     */
    set(name, obj, life) {
        if (typeof obj == "object") {
            let data = {
                obj: obj
            }
            if (life !== undefined) data.life = new Date().getTime() + life * 1000
            localStorage.setItem(name + "_obj", JSON.stringify(data))
        } else {
            localStorage.setItem(name + "_str", obj)
        }
        return true
    }

    remove(name) {
        localStorage.removeItem(name + "_obj")
        localStorage.removeItem(name + "_str")
        return true
    }
}

class SessionData {
    get(name, _default = null) {
        if (sessionStorage.getItem(name + "_obj")) {
            return JSON.parse(sessionStorage.getItem(name + "_obj"))
        } else if (sessionStorage.getItem(name + "_str")) {
            return sessionStorage.getItem(name + "_str")
        } else {
            return _default
        }
    }

    set(name, obj) {
        if (typeof obj == "object") {
            sessionStorage.setItem(name + "_obj", JSON.stringify(obj))
        } else {
            sessionStorage.setItem(name + "_str", obj)
        }
        return true
    }

    remove(name) {
        sessionStorage.removeItem(name + "_obj")
        sessionStorage.removeItem(name + "_str")
        return true
    }
}

function getQueryVariable(variable) {
    const query = window.location.search.substring(1)
    const vars = query.split("&")
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=")
        if (pair[0] === variable) {
            return pair[1]
        }
    }
    return false
}

function getBase64ImageFromUrl(url, callback) {
    if (typeof callback != "function") {
        callback = url => console.log(url)
    }
    axios.get(url, { responseType: 'blob' }).then(response => {
        callback(window.URL.createObjectURL(response.data))
    })
}

const localData = new LocalData()
const sessionData = new SessionData()

const api = `${process.env.VUE_APP_TRANSFER_PROTOCOL}://${process.env.VUE_APP_DOMAIN}`

export default {
    localData,
    sessionData,
    api,
    backgroundImageApi: `${api}/image/background/background.png`,
    getQueryVariable,
    getBase64ImageFromUrl
}