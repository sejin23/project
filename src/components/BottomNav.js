import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import plus from '../svg/plus.svg';
import './BottomNav.css';

const BottomNav = ({isLoginSuccess}) => {
    return (
        <div className="bottomnav">
            <Link to="/" className="bottomnav-link"><div className="bottomnav-text">TimeLine</div></Link>
            <Link to="/search" className="bottomnav-link"><div className="bottomnav-text">Search</div></Link>
            <Link to="/plus" className="bottomnav-link"><img className="bottomnav-img" src={plus} alt="plus"/></Link>
            <Link to="/notice" className="bottomnav-link"><div className="bottomnav-text">Notice</div></Link>
            { isLoginSuccess ?
                <Link to="/mypage" className="bottomnav-link"><div className="bottomnav-text">Mepage</div></Link>:
                <Link to="/login/false" className="bottomnav-link" onClick={() => localStorage.setItem('prev', '/mypage')}><div className="bottomnav-text">Login</div></Link>
            }
        </div>
    );
}

BottomNav.propTypes = {
    isLoginSuccess: PropTypes.bool,
}

BottomNav.defaultProps = {
    isLoginSuccess: false,
}

const mapStateToProps = (state) => ({
    isLoginSuccess: state.logIn.isLoginSuccess,
});

const BottomNavContainer = connect(
    mapStateToProps,
)(BottomNav);

export default BottomNavContainer;