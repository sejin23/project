import React from 'react';
import { IoMdCloseCircle } from 'react-icons/io';
import moment from 'moment';
import BottomNavContainer from '../components/BottomNav';
import * as Auth from '../api/auth';
import emailicon from '../svg/email_white.svg';
import pwicon from '../svg/pw_white.svg';
import './Signup.css';

class Signup extends React.Component{
    constructor() {
        super();
        this.state = {
            univ: '',
            depart: '',
            age: '',
            email: '',
            pw: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    onChange = (e) => this.setState({[e.target.name]: e.target.value});
    handleSubmit = (e) => {
        e.preventDefault();
        const { univ, depart, age, email, pw } = this.state;
        const date = moment().format('YYYY-MM-DD');
        if(univ === '' || depart === '' || age === '' || email === '' || pw === '') {
            alert('정보를 입력해주세요.');
            return false;
        }
        Auth.registerUser({univ, depart, age, email, pw, date}).then(res => {
            if(res.data)
                window.location.href = '/login/true';
            else alert('회원가입 실패');
        });
    }
    render() {
        const { univ, depart, age, email, pw } = this.state;
        return (
            <div className="signup">
                <div className="signupsub">
                    <div className="signup-msg">회원가입</div>
                    <div className="signupinput"><input type="text" className="signuptrans" name="univ" value={univ} onChange={this.onChange} placeholder="대학교를 입력해주세요."/><IoMdCloseCircle size="13px" className="logindel" onClick={()=>this.setState({univ:''})}/></div>
                    <div className="signupinput"><input type="text" className="signuptrans" name="depart" value={depart} onChange={this.onChange} placeholder="전공를 입력해주세요."/><IoMdCloseCircle size="13px" className="logindel" onClick={()=>this.setState({depart:''})}/></div>
                    <div className="signupinput"><input type="text" className="signuptrans" name="age" value={age} onChange={this.onChange} placeholder="나이를 입력해주세요."/><IoMdCloseCircle size="13px" className="logindel" onClick={()=>this.setState({age:''})}/></div>
                    <div className="signupinput">
                        <img src={emailicon} alt="email" width="23px"/>
                        <input type="email" name="email" value={email} onChange={this.onChange} placeholder="이메일를 입력해주세요."/>
                        <IoMdCloseCircle size="13px" className="mypagesetting-icons" onClick={()=>this.setState({email:''})}/>
                    </div>
                    <div className="signupinput">
                        <img src={pwicon} alt="pw" width="23px"/>
                        <input type="password" name="pw" value={pw} onChange={this.onChange} placeholder="비밀번호를 입력해주세요."/>
                        <IoMdCloseCircle size="13px" className="mypagesetting-icons" onClick={()=>this.setState({pw:''})}/>
                    </div>
                    <div className="signupbtn">
                        <div onClick={this.handleSubmit}>SIGN IN</div>
                    </div>
                </div>
                <BottomNavContainer />
            </div>
        );
    }
}

export default Signup;