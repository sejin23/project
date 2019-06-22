import React, { Component } from 'react';
import Swiper from 'react-id-swiper/lib/ReactIdSwiper.full';
import { IoIosArrowBack, IoMdCloseCircle } from 'react-icons/io';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as Auth from '../api/auth';
import './Plus.css';

class Plus extends Component {
    state = {
        isLoaded: false,
        isNext: false,
        univ: '',
        classes: '',
        prof: '',
        title: '',
        descript: '',
        files: []
    }
    uploadImages = e => {
        e.preventDefault();
        const { univ, classes, prof, title, descript, files } = this.state;
        const email = localStorage.getItem('email');
        const pw = localStorage.getItem('pw');
        Auth.uploadPost({email, pw, univ, classes, prof, title, descript}).then(res => {
            files.forEach((image, i) => {
                const data = new FormData();
                data.append('aid', i);
                data.append('pid', res.data);
                data.append('image', image.file);
                Auth.sendImage({data}).then(res => {
                    if(i === files.length - 1) window.location.href = '/';
                });
            });
        });
    }
    _handleImage = e => {
        e.preventDefault();
        let files = Array.from(e.target.files);
        files.forEach((file, i) => {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                this.setState({
                    files: this.state.files.concat({index: i, file: file, urls: reader.result, msg: ''})
                });
            }
        });
        this.setState({isLoaded: true, isNext: false});
    }
    _gotoLogin = () => {
        alert('로그인 후 업로드 해주세요.');
        localStorage.setItem('prev', '/plus');
        window.location.href = '/login/false';
    }
    onChange = (e) => this.setState({[e.target.name]: e.target.value})
    render() {
        const params = {
            pagination: {
              el: '.swiper-pagination',
              clickable: false
            },
            observer: true
        }
        const { isLoaded, isNext, univ, classes, prof, title, descript, files } = this.state;
        const { isLoginSuccess } = this.props;
        return (
            <div className="plus">
                <div className="plushead">
                    <IoIosArrowBack size="25px" onClick={()=>window.location.href='/'}/>
                    {isLoaded && isNext?
                        <div className="plusnext" onClick={this.uploadImages.bind(this)}>공유</div>:
                        <div className="plusnext" onClick={()=>this.setState({isNext: true})}>다음</div>
                    }
                </div>
                {isLoaded?
                    <div>
                        <Swiper {...params} shouldSwiperUpdate>
                            {files.map((file, i) => <div key={i}>
                                <img className="plusimages" alt='previewImg' src={file.urls} />
                            </div>)}
                        </Swiper>
                        {isNext?
                            <div className="plusinfo">
                                <div className="plusinfohead">해당 작업이 이루어진 환경에 대한 정보를 공유해보세요!</div>
                                <div className="plusinfotext">
                                    <div className="plusinfotitle">UNIV.</div>
                                    <input type='text' name='univ' value={univ} onChange={this.onChange}/>
                                    <IoMdCloseCircle size='15px' className="mypage-iconleft" onClick={()=>this.setState({univ: ''})}/>
                                </div>
                                <div className="plusinfotext">
                                    <div className="plusinfotitle">CLASS</div>
                                    <input type='text' name='classes' value={classes} onChange={this.onChange}/>
                                    <IoMdCloseCircle size='15px' className="mypage-iconleft" onClick={()=>this.setState({classes: ''})}/>
                                </div>
                                <div className="plusinfotext plusborderbottom">
                                    <div className="plusinfotitle">Prof.</div>
                                    <input type='text' name='prof' value={prof} onChange={this.onChange}/>
                                    <IoMdCloseCircle size='15px' className="mypage-iconleft" onClick={()=>this.setState({prof: ''})}/>
                                </div>
                            </div>:
                            <div style={{"textAlign": "center"}}>
                                <textarea className="plustitletext" name="title" value={title} onChange={this.onChange} placeholder="제목"/>
                                <textarea className="plustext" name="descript" value={descript} onChange={this.onChange} placeholder="시안에 대한 설명을 적어주세요."/>
                            </div>
                        }
                    </div>:
                    <div className="filebox">
                        <label htmlFor="plus_file">사진을 업로드 해주세요.</label>
                        <input id="plus_file" type="file" accept="image/*" multiple onChange={isLoginSuccess? this._handleImage.bind(this): this._gotoLogin.bind(this)} />
                    </div>
                }
            </div>
        );
    }
}

Plus.propTypes = {
    isLoginSuccess: PropTypes.bool,
}

Plus.defaultProps = {
    isLoginSuccess: false,
}

const mapStateToProps = (state) => ({
    isLoginSuccess: state.logIn.isLoginSuccess
});

const PlusContainer = connect(
    mapStateToProps
)(Plus);

export default PlusContainer;
