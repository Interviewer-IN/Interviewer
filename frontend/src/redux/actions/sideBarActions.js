export function showSideBar(status) {
    return {
        type: 'SET_VISIBILITY_SIDE_BAR',
        payload: status
    };
}

export function hideSideBar(status){
    return {
        type: 'REMOVE_VISIBILITY_SIDE_BAR',
        payload: status
    };
}

