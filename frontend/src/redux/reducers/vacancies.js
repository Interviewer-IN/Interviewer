const initialState = {
    vacancies: [],
    currentVacancy: {}
};

export default function vacancies (state = initialState, action) {
        switch (action.type){
            case 'ADD_VACANCIES':
                return {
                    ...state, vacancies: action.payload
                };
            case 'ADD_VACANCY':
                return {
                    ...state, currentVacancy: action.payload
                };

            case 'CREATE_VACANCY':
                return {
                    ...state, vacancies: action.payload
                };


            default:
                return state;
        }
}