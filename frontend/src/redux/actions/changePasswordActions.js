import fetch from "isomorphic-fetch";
import {makeNote} from "./notificationActions";
import {getCookies, setCookies} from "../../utils/index";
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

                        setCookies(response);

                        return response.json();
                    default:
                        return response.json();
                }
            })
            .then (data => {

                if (data.success){
                    dispatch(makeNote(
                        {
                            status: "success",
                            text: data.message,
                            hide: true
                        }
                    ));
                }

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