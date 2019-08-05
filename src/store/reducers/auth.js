import * as actionTypes from '../actions/actionTypes';

const initialState = {
    userId : null,
    error : null,
    loading : false,
    authRedirectPath:'/'
}
const reducer = (state =initialState , action) => {
    switch(action.type) {
        case actionTypes.AUTH_START : 
            return {
                ...state,
                loading : true
            }
        case actionTypes.AUTH_SUCCESS : 
            return {
                ...state,
                userId : action.userId,
                loading : false,
                authRedirectPath : '/planets'
            }
        case actionTypes.AUTH_FAIL : 
            return {
                ...state,
                error : action.error,
                loading : false
            }
        default : return state
    }
}

export default reducer;