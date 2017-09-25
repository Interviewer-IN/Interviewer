import fetch from "isomorphic-fetch";
import {makeNote, showNote} from "./notificationActions";


export function loggedUser(data) {
    return {
        type: 'LOGGED_USER',
        payload: data
    }
}

export function setUserData(data) {
    return {
        type: 'SET_USER_DATA',
        payload: JSON.stringify(data.data)
    }
}

export function doLogin(data) {

    return (dispatch) => {
        fetch('/auth/sign_in',
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(response => {

                switch (response.status) {
                    case 200:
                    case 201:
                        let accessToken = response.headers.get('access-token'),
                            expiry = response.headers.get('expiry'),
                            uid = response.headers.get('uid'),
                            client = response.headers.get('client');

                        expiry = new Date(expiry * 1000);

                        document.cookie = "access-token=" + accessToken + "; path=/; expires=" + expiry;
                        document.cookie = "uid=" + uid + "; path=/; expires=" + expiry;
                        document.cookie = "client=" + client + "; path=/; expires=" + expiry;


                        dispatch(loggedUser(true));
                        return response.json();

                    case 401:
                        return response.json();

                    case 500:
                        return response.json();


                    default:
                        dispatch(loggedUser(false));
                        return {data: {}};

                }

            })
            .then((data) => {

                if (data.data === undefined) {
                    dispatch(makeNote(
                        {
                            status: "warning",
                            text: data.errors[0],
                            hide: true
                        }
                    ));
                } else {
                    localStorage.setItem('userData', JSON.stringify(data.data));
                    dispatch(setUserData(data));

                }
            })
            .catch(err => {
                dispatch(showNote(
                    {
                        status: "danger",
                        text: "Error: " + err
                    }
                ));
            });
    }

}

export function getCookies() {
    let cookies = document.cookie.split('; '),
        cookiesObj = {};

    for (let i = 0; i < cookies.length; i++) {
        let result = cookies[i].split('=');
        cookiesObj[result[0]] = result[1];
    }

    return cookiesObj;
}


export function authorizationCheck() {

    let cookiesObj = getCookies();

    let accessToken = cookiesObj['access-token'],
        uid = cookiesObj['uid'],
        client = cookiesObj['client'],
        isUserLogged = true,
        userData = localStorage.getItem('userData');


    if (!(accessToken && client && uid)) {
        isUserLogged = false;
        userData = {};

        let date = new Date(0);

        document.cookie = 'access-token=; expires='+ date.toUTCString();
        document.cookie = 'client=; expires=' + date.toUTCString();
        document.cookie = 'uid=; expires=' + date.toUTCString();

        localStorage.removeItem('userData');

    }


    return {
        type: 'AUTH_CHECK',
        payload: {
            loggedUser: isUserLogged,
            userData: userData
        }
    }


}

export function logOut() {

    let cookiesObj = getCookies(),
        accessToken = cookiesObj['access-token'],
        uid = cookiesObj['uid'],
        client = cookiesObj['client'];

        fetch('/auth/sign_out',
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'uid': uid,
                    'client': client,
                    'access-token': accessToken
                }
            })
            .then(response => {

                switch (response.status){
                    case 200:
                    case 201:

                        return response.json();

                    default:
                        return response.json();
                }
            })
            .catch(err => {
                showNote(
                    {
                        status: "danger",
                        text: "Error: " + err
                    }
                );
            });


    let date = new Date(0);

    document.cookie = 'access-token=; expires='+ date.toUTCString();
    document.cookie = 'client=; expires=' + date.toUTCString();
    document.cookie = 'uid=; expires=' + date.toUTCString();

    localStorage.removeItem('userData');

    return (dispatch) => {
        dispatch(setUserData({data: {}}));
        dispatch(loggedUser(false));
    }






}


