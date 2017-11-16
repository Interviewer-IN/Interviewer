export function setCookies (response){
    let accessToken = response.headers.get('access-token'),
        expiry = response.headers.get('expiry'),
        uid = response.headers.get('uid'),
        client = response.headers.get('client');

    expiry = new Date(expiry * 1000);

    document.cookie = "access-token=" + accessToken + "; path=/; expires=" + expiry;
    document.cookie = "uid=" + uid + "; path=/; expires=" + expiry;
    document.cookie = "client=" + client + "; path=/; expires=" + expiry;
}