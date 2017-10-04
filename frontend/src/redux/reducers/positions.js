const initialState = {
    positions: []
};

export default function positions (state = initialState, action) {
    switch (action.type){
        case 'ADD_POSITIONS':
            return {
                ...state, positions: action.payload
            };
        default:
            return state;
    }
}