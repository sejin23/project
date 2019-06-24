import * as types from './ActionTypes';

export const popup = () => ({
    type: types.POPUP,
});

export const loginPending = (isLoginPending) => ({
    type: types.LOGIN_PENDING,
    isLoginPending
});

export const loginSuccess = (isLoginSuccess) => ({
    type: types.LOGIN_SUCCESS,
    isLoginSuccess
});

export const loginFailure = (isLoginError) => ({
    type: types.LOGIN_FAILURE,
    isLoginError
});
