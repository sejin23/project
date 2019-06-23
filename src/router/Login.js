import React, { Component } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import imog from '../svg/imog.svg';
import BottomNavContainer from '../components/BottomNav';
import * as Auth from '../api/auth';
import emailicon from '../svg/email.svg';
import pwicon from '../svg/pw.svg';
import signsuccess from '../svg/signsuccess.svg';
import './Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            issign: false
        }
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        if(this.props.match.params.success === 'true') this.setState({issign: true});
    }
    onChange = (e) => this.setState({[e.target.name]: e.target.value});
    onSubmit = (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        const { pendLogin, successLogin, failureLogin } = this.props;
        pendLogin(true);
        successLogin(false);
        failureLogin(null);
        Auth.tryLogin({email, password}).then((res, error) => {
            if(res.data) {
                pendLogin(false);
                successLogin(true);
                localStorage.setItem('email', email);
                localStorage.setItem('pw', password);
                const link = localStorage.getItem('prev');
                localStorage.setItem('prev', '/mypage');
                if(link) window.location.href = link;
                else window.location.href = '/mypage';
            } else {
                pendLogin(false);
                failureLogin(error);
                alert('로그인 실패!');
            }
        });
    };
    render() {
        const { email, password, issign } = this.state;
        return (
            <div className="login">
                {issign? <img src={signsuccess} alt="sign" className="login_up" onClick={()=>this.setState({issign: false})}/>:null}
                <div className="loginheader">로그인</div>
                <div className="loginbody">
                    <div className="logininput">
                        <img src={emailicon} alt="email" width="23px"/>
                        <input type="email" className="logintext" name="email" placeholder="이메일을 입력해주세요." value={email} onChange={this.onChange}/>
                        <IoMdCloseCircle size="13px" onClick={()=>this.setState({email: ''})}/>
                    </div>
                    <div className="logininput">
                        <img src={pwicon} alt="pw" width="23px"/>
                        <input type="password" className="logintext" name="password" placeholder="암호를 입력해주세요." value={password} onChange={this.onChange}/>
                        <IoMdCloseCircle size="13px" onClick={()=>this.setState({password: ''})}/>
                    </div>
                    <div className="loginbtn" onClick={this.onSubmit}>LOGIN</div>
                    <div>비밀번호를 잊으셨나요?</div>
                    <div className="loginsignup">
                        <div>계정이 없으신가요?</div><br/>
                        <img src={imog} alt="imog" className="imog"/>
                        <Link to='/signup' className="loginsignupbtn"><b>회원가입</b></Link>
                        <img src={imog} alt="imog" className="imog"/>
                    </div>
                </div>
                <BottomNavContainer />
            </div>
        );
    }
}

Login.propTypes = {
    pendLogin: PropTypes.func,
    successLogin: PropTypes.func,
    failureLogin: PropTypes.func
};

Login.defaultProps = {
    pendLogin: () => console.warn('pending Login not define'),
    successLogin: () => console.warn('success Login not define'),
    failureLogin: () => console.warn('failure Login not define')
};

export default Login;
