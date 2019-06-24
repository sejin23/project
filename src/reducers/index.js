import { combineReducers } from 'redux';
import * as types from '../actions/ActionTypes';

function popUpReducer(state = {
    popUp: true,
    delete_com: false,
}, action) {
    switch(action.type) {
        case types.POPUP:
            return {
                ...state,
                popUp: false
            };
	case types.DELETE_POST:
	    return {
		...state,
		delete_com: true,
	    };
	case types.DELETE_EXIT:
	    return {
		...state,
		delete_com: false,
	    };
        default:
            return state;
    }
}

function loginReducer(state = {
    isLoginPending: false,
    isLoginSuccess: false,
    isLoginError: null,
}, action) {
    switch(action.type) {
        case types.LOGIN_PENDING:
            return {
                ...state,
                isLoginPending: action.isLoginPending
            };
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                isLoginSuccess: action.isLoginSuccess
            };
        case types.LOGIN_FAILURE:
            return {
                ...state,
                isLoginError: action.isLoginError
            };
        default:
            return state;
    }
}

export default combineReducers({
    popUp: popUpReducer,
    logIn: loginReducer,
});
