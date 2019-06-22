import React, { Component } from 'react';
import PropTypes from 'prop-types';
import nono from '../svg/nono.gif';
import close from '../svg/close.svg';
import './PopupPage.css';

class PopupPage extends Component {
    state = {
        checked: false
    }
    componentDidMount() {
        const checked = localStorage.getItem('popout');
        const { deletePop } = this.props;
        if(checked) deletePop();
    }
    _handleClick = () => {
        if(this.state.checked) localStorage.setItem('popout', true)
        this.props.deletePop();
    }
    render() {
        const { popUp } = this.props;
        return (
            <div className={popUp? 'popon': 'popoff'}>
                <div className="popbody">
                    <img className="popimg" src={nono} alt="NONO"/>
                    <div className="poptext popfont40">정답은 없지만</div>
                    <div className="poptext popfont40 popborder">오답은 있다구</div>
                    <div className="poptext popfont15">안녕 나는 노노(のの)입니다. 이건 아닌데,,, 싶은 시안에는 두 번 눌러 ㄴㄴ를 표하세요,,,</div>
                    <div className="popclose">
                        <div className="popclosemsg">다신 보고 싶지 않다면</div>
                        <input type="checkbox" className="popcheck" onChange={e=>this.setState({checked: e.target.value})}/>
                        <img src={close} className="popcloseimg" alt="close" onClick={this._handleClick}/>
                    </div>
                </div>
            </div>
        );
    }
}

PopupPage.propTypes = {
    popUp: PropTypes.bool,
    deletePop: PropTypes.func,
};

PopupPage.defaultProps = {
    popUp: true,
    deletePop: () => console.warn('deletepop not define'),
};

export default PopupPage;
