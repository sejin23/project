import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BottomNavContainer from '../components/BottomNav';
import * as Auth from '../api/auth';
import './Notice.css';

class Notice extends Component {
    constructor() {
        super();
        this.state = {
            alarm: true,
            joinnum: 0,
            comment: ''
        }
    }
    componentDidMount() {
        const email = localStorage.getItem('email');
        const password = localStorage.getItem('pw');
        Auth.getUid({email, password}).then(res => res.data? Auth.getComment({uid: res.data}).then(res2 => res2.data? this.setState({
            comment: res2.data.msg,
            joinnum: res2.data.num
        }): null): null);
    }
    onStorePage = () => {
        localStorage.setItem('prev', '/notice');
        window.location.href = '/login/false';
    }
    render() {
        const { alarm, comment, joinnum } = this.state;
        const { isLoginSuccess } = this.props;
        return (
            <div>
                <div className="notice">
                    <div className="noticeheader">
                        <div className={alarm ? "noticeblack" : "noticegrey"} onClick={()=>this.setState({alarm: true})}>알림</div>
                        <div className={alarm ? "noticegrey" : "noticeblack"} onClick={()=>this.setState({alarm: false})}>메세지</div>
                    </div>
                    {isLoginSuccess ?
                        alarm? <div className="noticelogin">
                            {comment === ""? null: <div>새로운 댓글이 달렸습니다. :{comment}</div>}
                            {joinnum === 0? null: <div>최근 {joinnum}명이 회원님의 투표에 참여했습니다.</div>}
                        </div>
                        :<div className="noticemessage">
                            
                        </div>
                        :<div className="noticelogin" onClick={this.onStorePage}>로그인 후 이용해주세요.</div>
                    }
                </div>
                <BottomNavContainer />
            </div>
            
        );
    }
}

Notice.propTypes = {
    isLoginSuccess: PropTypes.bool
}

Notice.defaultProps = {
    isLoginSuccess: false,
}

const mapStateToProps = (state) => ({
    isLoginSuccess: state.logIn.isLoginSuccess
});

const NoticeContainer = connect(
    mapStateToProps
)(Notice);


export default NoticeContainer;
