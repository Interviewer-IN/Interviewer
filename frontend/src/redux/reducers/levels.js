const initialState = {
    levels: []
};

export default function levels (state = initialState, action) {
    switch (action.type){
        case 'ADD_LEVELS':
            return{
                ...state, levels: action.payload
            };

        default:
            return state;
    }
}