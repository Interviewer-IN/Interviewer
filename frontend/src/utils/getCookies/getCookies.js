export function getCookies() {
    let cookies = document.cookie.split('; '),
        cookiesObj = {};

    for (let i = 0; i < cookies.length; i++) {
        let result = cookies[i].split('=');
        cookiesObj[result[0]] = result[1];
    }

    return cookiesObj;
}