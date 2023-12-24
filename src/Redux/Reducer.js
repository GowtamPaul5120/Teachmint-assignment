const initialState = {
    userIdMap: {},
    pageId: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'setUserIdMap':
            return {
                ...state,
                userIdMap: action.payload,
            };
        case 'setPageId':
            return {
                ...state,
                pageId: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
