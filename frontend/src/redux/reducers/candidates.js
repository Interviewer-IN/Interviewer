let initState = {
    candidates: []

};


export default function candidates(state = initState, action) {
        switch (action.type){
            case 'ADD_CANDIDATES':
                return {
                    ...state, candidates: action.payload
                };
            case 'ADD_CANDIDATE':
                return {
                    ...state, candidates: action.payload
                };
            default:
                return state;
        }
}