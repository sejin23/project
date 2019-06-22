import React, {Component} from 'react';
import * as Auth from '../api/auth';
import { Link } from 'react-router-dom';
import PopupContainer from '../containers/PopupContainer';
import BottomNavContainer from '../components/BottomNav';
import nono_inverse from '../svg/nono_inverse.svg';
import nono_reverse from '../svg/nono_reverse.svg';
import './TimeLine.css';

class TimeLine extends Component {
    state = {
        posts: [],
    }
    componentDidMount() {
        const { posts } = this.state;
        Auth.showPosting().then(res => {
            if(res.data) this.setState({posts: posts.concat(res.data)});
        });
    }
    render() {
        const { posts } = this.state;
        return (
            <div>
                <div className="timelinehead">
                    <img width="50px" height="50px" src={nono_reverse} alt="none" />
                    <img width="50px" height="50px" src={nono_inverse} alt="nono" />
                </div>
                <div className="timelinebody">
                    {posts.map((post, i) => <Link to={`/post/${post.pid}`} key={i} className="timelinepost">
                        {post.title? <div className="timelinetitle">{post.title}</div>: <div className="timelinehidden">Title</div>}
                        <div className="timelineimages">{post.images.map((image, id) => <img key={id} src={image[0]} alt="posts"/>)}</div>
                    </Link>)}
                </div>
                <PopupContainer />
                <BottomNavContainer />
            </div>
        );
    }
}

export default TimeLine;
