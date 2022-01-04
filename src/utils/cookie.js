function getDomain() {
    let domainArr = window.location.hostname.split(".")
    let domain
    if (domainArr.length > 2) {
        domain = domainArr.pop()
        domain = domainArr.pop() + "." + domain
    } else if (domainArr[domainArr.length - 1] === "localhost" || domainArr.length === 1) { // dev for wsl2 "localhost"
        domain = "localhost"
    } else {
        domain = domainArr.pop()
    }
    return domain
}

let getCookie = name => {
    let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)")
    arr = document.cookie.match(reg)
    if (arr)
        return (arr[2])
    else
        return null
}
let setCookie = (name, value, expireDays, domain = null) => {
    domain = domain === null ? getDomain() : domain
    let date = new Date()
    date.setTime(date.getTime() + (expireDays * 24 * 60 * 60 * 1000))
    document.cookie = name + "=" + value + ((expireDays == null) ? "" : ";expires=" + date.toUTCString()) + ";path=/;domain=" + domain
}
let delCookie = (name, domain = null) => {
    domain = domain === null ? getDomain() : domain
    let exp = new Date()
    exp.setTime(exp.getTime() - 1)
    let value = getCookie(name)
    if (value != null)
        document.cookie = name + "=" + value + ";expires=" + exp.toUTCString() + ";path=/;domain=" + domain
}

export default {
    getCookie: getCookie,
    setCookie: setCookie,
    delCookie: delCookie
}