let initState = {
    candidates: [],
    currentCandidate: {}
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

            case 'CURRENT_CANDIDATE':
                return {
                    ...state, currentCandidate: action.payload
                };

            default:
                return state;
        }
}