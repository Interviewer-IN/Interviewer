const initialState = {
    interviewers: []
};

export default function interviewers(state = initialState, action) {
    switch (action.type) {

        case 'ADD_INTERVIEWERS':
            return {
                ...state, interviewers: action.payload
            };

        default:
            return state;
    }
}

