import Login from '../router/Login';
import * as actions from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    isLoginSuccess: state.logIn.isLoginSuccess
});

const mapDispatchToProps = (dispatch) => ({
    pendLogin: (msg) => dispatch(actions.loginPending(msg)),
    successLogin: (msg) => dispatch(actions.loginSuccess(msg)),
    failureLogin: (msg) => dispatch(actions.loginFailure(msg))
});

const LoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

export default LoginContainer;