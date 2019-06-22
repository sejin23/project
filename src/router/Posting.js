import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Swiper from 'react-id-swiper/lib/ReactIdSwiper.full';
import { connect } from 'react-redux';
import * as Auth from '../api/auth';
import moment from 'moment';
import nono_inverse from '../svg/nono_inverse.svg';
import nono_reverse from '../svg/nono_reverse.svg';
import chooseimg from '../svg/chooseimg.svg';
import addcomment from '../svg/addcomment.svg';
import personalmsg from '../svg/personalmsg.svg';
import msgball from '../svg/msgball.svg';
import mail from '../svg/mail.svg';
import siren from '../svg/siren.svg';
import heart from '../svg/heart.svg';
import close from '../svg/x.svg';
import votedmark from '../svg/votedmark.gif';
import * as urlinfo from '../api/urlinfo';
import './Posting.css';

class Posting extends Component {
    constructor() {
        super();
        this.state = {
            isclick: false,
            isvoted: false,
            isnono: false,
            selectedNo: 0,
            title: '',
            script: '',
            date: '',
            uid: 0,
            postinfo: {},
            scomments: '',
            bcomments: '',
            comment: [],
            data: []
        }
        this._onsubmitComments = this._onsubmitComments.bind(this);
    }
    componentDidMount = () => {
        const { match } = this.props;
        const email = localStorage.getItem('email');
        const pw = localStorage.getItem('pw');
        Auth.getUid({email: email, password: pw}).then(res => 
            Auth.aPosting({pid: match.params.pid}).then(res2 => {
                if(res2.data) {
                    this.setState({
                        isvoted: res.data? res2.data.uid === res.data? true: res2.data.comment.some(cm => (cm.uid === res.data && cm.voted)? true: false): false,
                        title: res2.data.title,
                        script: res2.data.script,
                        date: res2.data.date,
                        uid: res.data? res.data: 0,
                        postinfo: {univ: res2.data.univ, class: res2.data.class, prof: res2.data.prof},
                        data: res2.data.image,
                        comment: res2.data.comment,
                    });
                } else console.log('posting not exist');
            })
        );
    }
    _onsubmitComments = (e, is) => {
        e.preventDefault();
        const { uid, selectedNo, scomments, bcomments } = this.state;
        if(uid === 0) {
            alert('로그인 후 이용해주세요.');
            localStorage.setItem('prev', `/post/${this.props.match.params.pid}`);
            window.location.href = '/login/false';
            return false;
        }
        if((is && scomments === "") || (!is && bcomments === "")) {
            alert('의견이 필요해요.');
            return false;
        }
        Auth.attachComment({
            uid: uid,
            aid: selectedNo,
            pid: this.props.match.params.pid,
            msg: is? scomments: bcomments,
            imog: Math.random() * 72 + 1,
            voted: is
        }).then(res => {
            if(res.data) {
                this.setState({scomments: '', bcomments: '', isnono: false, isclick: false});
                window.location.reload();
            } else alert('다시 한번 버튼을 눌러주세요');
        });
    }
    _gotoLogin = (e, link) => {
        e.preventDefault();
        localStorage.setItem('prev', `/post/${this.props.match.params.pid}`);
        window.location.href = link;
    }
    render() {
        const params = {
            pagination: {
              el: '.swiper-pagination',
              clickable: false
            },
            observer: true
        }
        const { isclick, isvoted, isnono, selectedNo, title, script, date, uid, postinfo, scomments, bcomments, comment, data } = this.state;
        const { isLoginSuccess, match } = this.props;
        const urls = urlinfo.URL;
        return (
            <div className="posting">
                {isclick?
                    isLoginSuccess?
                        <div className="postingpopup postingpopvote">
                            <img src={close} width="23px" alt="close" className="postingpopclose" onClick={()=>this.setState({isclick: false})}/>
                            투표 결과를 보려면 투표에 참여해야 해요! 이건 좀 별론데? 하는 시안을 두 번 눌러 のㄴㄴの를 표해보세요.
                        </div>
                        :<div className="postingpopup postingpoplog">
                            <img src={close} width="23px" alt="close" className="postingpopclose" onClick={()=>this.setState({isclick: false})}/>
                            투표에 참여하시려면 회원가입을 완료해주세요.
                            <div className="postinglogin">
                                <div onClick={e=>this._gotoLogin(e, '/signup')}>회원가입</div>
                                <div onClick={e=>this._gotoLogin(e, '/login/false')}>로그인</div>
                            </div>
                        </div>
                    :isnono?
                        <div className="postingpopup postingpoplike">
                            <img src={close} width="23px" alt="close" className="postingpopclose" onClick={()=>this.setState({isnono: false})}/>
                            {data.map((el, i) => i === selectedNo? <img src={`http://${urls}:3000/api/auth/load/images?name=${el.image}`} className="postingsmallimg" key={i} alt='small'/>:null)}
                            <div id="smallmsg">왜 별로라고 생각했나요?</div>
                            <div className="postinginput">
                                <textarea placeholder="의견을 남겨주세요 :)" value={scomments} onChange={(e)=>this.setState({scomments: e.target.value})}/>
                                <div id="images">
                                    <img src={chooseimg} alt="choose" width="22px"/>
                                    <img src={addcomment} alt="plus"  width="22px" onClick={e=>this._onsubmitComments(e, true)}/>
                                </div>
                            </div>
                        </div>
                        :null
                }
                <div className="timelinehead">
                    <img width="50px" height="50px" src={nono_reverse} alt="none" />
                    <div onClick={()=>window.location.href='/'}>{title}</div>
                    <img width="50px" height="50px" src={nono_inverse} alt="nono" />
                </div>
                <Swiper {...params} shouldSwiperUpdate>
                    {data.map((post, i) => <div key={i} className="postingmain">
                        {comment.some(cm => (cm.uid === uid && cm.aid === i && cm.voted)? true: false)? <img src={votedmark} alt="mark" className="postingmark"/>:null}
                        <img src={`http://${urls}:3000/api/auth/load/images?name=${post.image}`} onClick={()=>this.setState({isnono: true, selectedNo: i})} key={i} className='postingmainimgs' alt='postImg' />
                        <p></p>
                    </div>)}
            	</Swiper>
                <div className="postingvote" onClick={()=>isvoted? window.location.href = `/result/${match.params.pid}`:this.setState({isclick: true})}>결과보기</div>
                <div className="postingbetween">
                    <div className="postingmsg">{script}</div>
                    <div className="postingtime">{moment(date).format('YYYY.MM.DD hh:mm')}</div>
                </div>
                <div className="postinginfo">
                    <div className="postinginfolist">
                        <b>UNIV.</b>
                        <b>CLASS</b>
                        <b>PROF.</b>
                    </div>
                    {isvoted?
                        <div className="postinginfotext">
                            <div>{postinfo.univ}</div>
                            <div>{postinfo.class}</div>
                            <div>{postinfo.prof}</div>
                        </div>:
                        <div className="postinginfotext">투표에 참여하시면 공개됩니다.</div>
                    }
                </div>
                <div className="postingcomments">
                    <div id="comments">Comments({comment.length})</div>
                    <div className="postinginput">
                        <textarea placeholder="의견을 남겨주세요 :)" value={bcomments} onChange={(e)=>this.setState({bcomments: e.target.value})}/>
                        <div id="images">
                            <img src={chooseimg} alt="choose" width="30px"/>
                            <img src={addcomment} alt="plus" width="30px" onClick={e=>this._onsubmitComments(e, false)}/>
                        </div>
                    </div>
                    <div className="postingsendmsg">
                        <img src={personalmsg} alt="personalmsg" width="130px"/>
                    </div>
                    {comment.map((cm, i) => <div key={i}>
                        <div className="commentheader">
                            <img src={process.env.PUBLIC_URL + `/emoticon/img_${cm.emoticon}.png`} width="75px" alt="random"/>
                            <div className="commentheadericon">
                                <img src={msgball} id="msgball" width="13px" alt="msgball" />
                                <img src={mail} width="15px" alt="mail" />
                                <img src={siren} width="13px" alt="siren" />
                                <img src={heart} width="13px" alt="heart" />
                            </div>
                        </div>
                        <div className="commentbody">
                            <div id='commenttext'>
                                <div>{cm.msg}</div>
                                <div className="commentdate">{moment(cm.date).format('YYYY.MM.DD hh:mm')}</div>
                            </div>
                            {cm.voted? <img src={`http://${urls}:3000/api/auth/load/images?name=${this.state.data[cm.aid].image}`} height='80px' alt='comments'/>: null}
                        </div>
                    </div>)}
                </div>
            </div>
        );
    }
}

Posting.propTypes = {
    isLoginSuccess: PropTypes.bool,
}

Posting.defaultProps = {
    isLoginSuccess: false,
}

const mapStateToProps = (state) => ({
    isLoginSuccess: state.logIn.isLoginSuccess
});

const PostingContainer = connect(
    mapStateToProps
)(Posting);

export default PostingContainer;
