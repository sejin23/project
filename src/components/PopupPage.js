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
                    <div className="poptext popfont15">안녕 나는 노노(のの)입니다.</div>
		    <div className="poptext popfont15"><u className="pophighlight">이건 좀 별로인 시안</u>에는</div>
		    <div className="poptext popfont15">한 번 탭하여 ㄴㄴ를 표하세요!</div>
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
