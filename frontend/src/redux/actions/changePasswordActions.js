import fetch from "isomorphic-fetch";
import {makeNote} from "./notificationActions";
import {getCookies} from "../../utils/index";
import {CHANGE_PASSWORD_SUCCESS} from "../../config";

export function changePassword(data){

    let cookiesObj = getCookies(),
        accessToken = cookiesObj['access-token'],
        uid = cookiesObj['uid'],
        client = cookiesObj['client'];

    return (dispatch) =>  new Promise ( resolve => {
        fetch('/auth/password',
            {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'access-token': accessToken,
                    'client': client,
                    'uid': uid
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


                        return response.json();
                    default:
                        return {data: []}
                }
            })
            .then (data => {
                dispatch(makeNote(
                    {
                        status: "success",
                        text: CHANGE_PASSWORD_SUCCESS,
                        hide: true
                    }
                ));
                resolve(data.data);
            })
            .catch(error => {
                dispatch(makeNote({
                    status: 'danger',
                    text: 'Error: ' + error,
                    hide: false
                }));
                resolve();
            })
    });


}