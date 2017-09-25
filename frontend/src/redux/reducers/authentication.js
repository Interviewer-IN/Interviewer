const initialState = {
    userData: {},
    loggedUser: false
};

export default function login(state = initialState, action) {
    switch (action.type) {
        case 'SET_USER_DATA':
            return {...state, userData: action.payload };

        case 'AUTH_CHECK':
            return {
                ...state,
                loggedUser: action.payload.loggedUser,
                userData: action.payload.userData
            };

        case 'LOGGED_USER':
            return {...state, loggedUser: action.payload};

        case 'LOG_OUT':
            return {
                ...state,
                userData: action.payload.userData,
                loggedUser: action.payload.loggedUser,
                sessionData: action.payload.sessionData

            };

        default:
            return state;
    }

}
