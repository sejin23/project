import React, {Component} from 'react';
import { GoChevronDown, GoChevronUp } from 'react-icons/go';
import nono_reverse from '../svg/nono_black.svg';
import nono_inverse from '../svg/nono_black_reverse.svg';
import * as Auth from '../api/auth';
import * as urlinfo from '../api/urlinfo';
import './VotingResult.css';

class VotingResult extends Component {
    state = {
        title: '',
        pieces: [],
        likelist: []
    }
    componentDidMount() {
        const { match } = this.props;
        Auth.resultlikes({pid: match.params.pid}).then(res => {
            if(res.data) {
                let data = [];
                res.data.pie.forEach((arr, i) => {
                    data.push({image: []});
                    arr.comm.forEach(brr =>
                        Auth.getlikelist({uid: brr.uid, pid: match.params.pid}).then(res2 => {
                            if(res2.data) res2.data.forEach(crr => data[i].image.push(crr.image))
                        })
                    )
                });
                this.setState({
                    title: res.data.title,
                    pieces: res.data.pie,
                    likelist: data
                });
            } else console.log('posting not exist');
        })
    }
    render() {
        const { title, pieces, likelist } = this.state;
        const urls = urlinfo.URL;
        return (
            <div className="result">
                <div className="timelinehead">
                    <img width="60px" height="60px" src={nono_reverse} alt="none" />
                    <div className="resulttitle" onClick={()=>window.location.href=`/post/${this.props.match.params.pid}`}>{title}</div>
                    <img width="60px" height="60px" src={nono_inverse} alt="nono" />
                </div>
                {pieces.map((pie, i) => <div key={i}>
                    <div className="resultbox">
                        <div className="resultrank">{pieces.length - i}</div>
                        <div>
                            <img src={`http://${urls}:3000/api/auth/load/images?name=${pie.img}`} className="resultimg" alt="pie"/>
                            <div className={pie.isopen? "resultlike": "resultlike resultborder"}>
                                <div id="resulttext">{pie.like}のの를 받았습니다.</div>
                                {pie.isopen?
                                <GoChevronUp onClick={()=>this.setState({pieces: pieces.map((el, j) => i === j? {...el, ...{isopen: false}}:el)})}/>
                                :<GoChevronDown onClick={()=> this.setState({pieces: pieces.map((el, j) => i === j? {...el, ...{isopen: true}}:el)})}/>}
                            </div>
                        </div>
                    </div>
                    {pie.isopen?
                        <div className="resultbody">
                            <div className="resultcomment">
                                <b>Comments({pie.comm.length})</b>
                                {pie.comm.map((te, j) => te.voted? <p key={j}>{te.comment}</p>: null)}
                            </div>
                            <div className="resultcomment">
                                <b>어떤 사람이 참여했을까요?</b>
				<p/>
				<b>(준비중)</b>
                            </div>
                            <div className="resultcomment">
                                <b>이 시안을 싫어한 사람이 싫어한 시안</b>
                                <div className="resultlikelist">
                                    {likelist.map((li, k) => k === i? li.image.map((lj, l) => <img src={`http://${urls}:3000/api/auth/load/images?name=${lj}`} alt="list" key={l}/>): null)}
                                </div>
                            </div>
                        </div>
                    :null}
                </div>)}
            </div>
        );
    }
}

export default VotingResult;
