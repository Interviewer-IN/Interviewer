const initialState = {
    interviewers: [],
    currentInterviewer: {}
};

export default function interviewers(state = initialState, action) {
    switch (action.type) {

        case 'ADD_INTERVIEWERS':
            return {
                ...state, interviewers: action.payload
            };

        case 'ADD_INTERVIEWER':
            return {
                ...state, interviewers: action.payload
            };

        case 'CURRENT_INTERVIEWER':
            return {
                ...state, currentInterviewer: action.payload
            };

        default:
            return state;
    }
}

