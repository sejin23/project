import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as Auth from '../api/auth';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
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
	const { delete_com } = this.props;
        const { posts } = this.state;
        return (
            <div>
                {delete_com? <div>Hello</div>: null}
		<div className="timelinehead">
                    <img width="50px" height="50px" src={nono_reverse} alt="none" />
                    <img width="50px" height="50px" src={nono_inverse} alt="nono" />
                </div>
                <div className="timelinebody">
                    {posts.map((post, i) => <Link to={`/post/${post.pid}`} key={i} className="timelinepost">
                        {post.title? <div className="timelinetitle">{post.title}</div>: <div className="timelinehidden">title</div>}
                        <div className="timelineimgs">{post.images.map((image, id) => <div key={id} className="timelinewrap"><img src={image[0]} alt="posts"/></div>)}</div>
                    </Link>)}
                </div>
                <PopupContainer />
                <BottomNavContainer />
            </div>
        );
    }
}

TimeLine.propTypes = {
    delete_com: PropTypes.bool
}

TimeLine.defaultProps = {
    delete_com: false
}

const mapStateToProps = (state) => ({
    delete_com: state.popUp.delete_com,
});

const TimeLineContainer = connect(
    mapStateToProps,
)(TimeLine);

export default TimeLineContainer;
