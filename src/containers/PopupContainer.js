import PopupPage from '../components/PopupPage';
import * as actions from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    popUp: state.popUp.popUp,
});

const mapDispatchToProps = (dispatch) => ({
    deletePop: () => dispatch(actions.popup()),
});

const PopupContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(PopupPage);

export default PopupContainer;