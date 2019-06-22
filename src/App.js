import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TimeLine from './router/TimeLine';
import Posting from './router/Posting';
import VotingResult from './router/VotingResult';
import Search from './router/Search';
import Plus from './router/Plus';
import Notice from './router/Notice';
import Signup from './router/Signup';
import Mypage from './router/Mypage';
import LoginContainer from './containers/LoginContainer';
import * as Auth from './api/auth';
import * as actions from './actions';

class App extends Component {
  componentDidMount() {
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('pw');
    const { pendLogin, successLogin } = this.props;
    pendLogin(true);
    successLogin(false);
    Auth.tryLogin({email, password}).then(res => {
      if(res.data) successLogin(true);
      pendLogin(false);
    });
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={TimeLine} />
          <Route path='/post/:pid' component={Posting} />
          <Route path='/result/:pid' component={VotingResult} />
          <Route path='/search' component={Search} />
          <Route path='/plus' component={Plus} />
          <Route path='/notice' component={Notice} />
          <Route path='/login/:success' component={LoginContainer} />
          <Route path='/signup' component={Signup} />
          <Route exact path='/mypage' component={Mypage} />
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  pendLogin: PropTypes.func,
  successLogin: PropTypes.func,
};

App.defaultProps = {
  pendLogin: () => console.warn('pending Login not define'),
  successLogin: () => console.warn('success Login not define'),
};

const mapStateToProps = (state) => ({
  isLoginPending: state.logIn.isLoginPending,
  isLoginSuccess: state.logIn.isLoginSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  pendLogin: (msg) => dispatch(actions.loginPending(msg)),
  successLogin: (msg) => dispatch(actions.loginSuccess(msg)),
});

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;