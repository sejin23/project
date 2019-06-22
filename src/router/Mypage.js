import React, { Component } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';
import BottomNavContainer from '../components/BottomNav';
import moment from 'moment';
import CustomMsg from '../components/CustomMsg';
import setting from '../svg/setting.svg';
import close from '../svg/x.svg';
import emailicon from '../svg/email.svg';
import pwicon from '../svg/pw.svg';
import * as Auth from '../api/auth';
import './Mypage.css';

class MypageMain extends Component {
    constructor() {
        super();
        this.state = {
            choice: true,
            related: []
        }
    }
    componentDidMount() {
        const email = localStorage.getItem('email');
        const password = localStorage.getItem('pw');
        Auth.getUid({email, password}).then(res => {
            if(res.data)
                Auth.getRelated({uid: res.data}).then(res2 => {
                    if(res2.data) this.setState({
                        related: res2.data
                    });
                });
        });
    }
    render() {
        const { choice, related } = this.state;
        const { univ, depart, age, images } = this.props;
        return (
            <div>
                <div className="mypagetext">{univ}</div>
                <div className="mypagetext">{depart}</div>
                <div className="mypagetext">{age}세</div>
                <div className="mypagechoice mypagetext">
                    <div className={choice? "":"mypagemain-grey"} onClick={()=>this.setState({choice: true})}>등록한 게시물</div>
                    <div className={(!choice)? "":"mypagemain-grey"} onClick={()=>this.setState({choice: false})}>참여한 게시물</div>
                </div>
                {choice?
                    <div className="mypageimages">{images.map((im, i) => <img key={i} className="mypageposting" src={im.imn} alt="mypost" onClick={()=>window.location.href=`/post/${im.pid}`}/>)}</div>:
                    <div className="mypageimages">{related.map((im, i) => <img key={i} src={im.img} className="mypageposting" alt="relatedpost" onClick={()=>window.location.href=`/post/${im.pid}`}/>)}</div>
                }
            </div>
        );
    }
}

class MypageSetting extends Component {
    constructor() {
        super();
        this.state = {
            univ: '',
            depart: '',
            age: '',
            email: '',
            password: '',
            made: '',
            resp: false,
        }
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        const { univ, depart, age, email, pw, made } = this.props;
        this.setState({
            univ: univ,
            depart: depart,
            age: age,
            email: email,
            password: pw,
            made: made,
        });
    }
    onChange = (e) => this.setState({[e.target.name]: e.target.value});
    onLogOut = () => {
        localStorage.removeItem('email');
        localStorage.removeItem('pw');
        window.location.href = '/login/false';
    }
    onSubmit = () => {
        const email = localStorage.getItem('email');
        const password = localStorage.getItem('pw');
        if(window.confirm('정말로 탈퇴하시겠습니까?')) {
            Auth.leaveUser({email, password}).then(res => {
                if(res.data) {
                    localStorage.clear();
                    window.location.href = '/login/false';
                }
                console.log(res.data);
            });
        }
    }
    render() {
        const { univ, depart, age, email, password, made, resp } = this.state;
        return (
            <div>
                <div className="mypagesetting-text"><input type='text' name="univ" value={univ} onChange={this.onChange}/><IoMdCloseCircle size="13px" className="mypage-iconleft" onClick={()=>this.setState({univ: ''})}/></div>
                <div className="mypagesetting-text"><input type='text' name="depart" value={depart} onChange={this.onChange}/><IoMdCloseCircle size="13px" className="mypage-iconleft" onClick={()=>this.setState({depart: ''})}/></div>
                <div className="mypagesetting-text"><input type='text' name="age" value={age} onChange={this.onChange}/><IoMdCloseCircle size="13px" className="mypage-iconleft" onClick={()=>this.setState({age: ''})}/></div>
                <div className="mypagesetting-text">
                    <img src={emailicon} alt="email" width="23px" className="mypage-iconright mypage-iconleft"/>
                    <input type='email' name="email" value={email} onChange={this.onChange}/>
                    <IoMdCloseCircle size="13px" className="mypage-iconleft" onClick={()=>this.setState({email: ''})}/>
                </div>
                <div className="mypagesetting-text">
                    <img src={pwicon} alt="pw" width="23px" className="mypage-iconleft mypage-iconright"/>
                    <input type='password' name="password" value={password} onChange={this.onChange}/>
                    <IoMdCloseCircle size="13px" className="mypage-iconleft" onClick={()=>this.setState({password: ''})}/>
                </div>
                <div className="mypagetext" onClick={()=>this.setState({resp: true})}>로그아웃</div>
                <div className="mypagetext" onClick={this.onSubmit}>회원탈퇴</div>
                <div className="mypagetext mypagemargin">{moment(made).format('YY.MM.DD')}에 가입하셨습니다.</div>
                {resp?
                    <CustomMsg mainmsg="마지데스까 ㅜㅁㅜ" confirm="ㅇ ㅇ" cancel="ㄴ ㄴ" confirmfunc={()=>this.onLogOut()} cancelfunc={()=>this.setState({resp: false})}/>:
                    null
                }
            </div>
        );
    }
}

class Mypage extends Component {
    constructor() {
        super();
        this.state = {
            univ: '',
            depart: '',
            age: '',
            made: '',
            main: true,
            images: []
        }
    }
    componentDidMount() {
        const email = localStorage.getItem('email');
        const password = localStorage.getItem('pw');
        Auth.getUserinfo({email, password}).then(res => {
            if(res.data)
                this.setState({
                    univ: res.data.university,
                    depart: res.data.department,
                    age: res.data.age,
                    made: res.data.made,
                    images: res.data.images
                });
        });
    }
    render() {
        const { univ, depart, age, made, main, images } = this.state;
        const email = localStorage.getItem('email');
        const password = localStorage.getItem('pw');
        return (
            <div className="mypage">
                <div className="mypageheader">
                    <div>Profile</div>
                    <img src={main? setting: close} className="settingimg" alt="setting" onClick={()=>this.setState({main: !main})}/>
                </div>
                {main? <MypageMain univ={univ} depart={depart} age={age} images={images}/>: <MypageSetting univ={univ} depart={depart} age={age} email={email} pw={password} made={made}/>}
                <BottomNavContainer />
            </div>
        );
    }
}

export default Mypage;
