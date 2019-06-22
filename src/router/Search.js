import React, { Component } from 'react';
import { GoSearch } from 'react-icons/go';
import BottomNavContainer from '../components/BottomNav';
import * as Auth from '../api/auth';
import * as urlinfo from '../api/urlinfo';
import './Search.css';

class Search extends Component {
    state = {
        search: '',
        data: []
    }
    componentDidMount() {
        Auth.searchImg({search: ''}).then(res => {
            if(res.data) this.setState({data: res.data});
            else this.setState({data: []});
        });
    }
    _onSubmitSearch = () => {
        const { search } = this.state;
        Auth.searchImg({search: search}).then(res => {
            if(res.data) this.setState({data: res.data});
            else this.setState({data: []});
        });
    }
    render() {
        const { data, search } = this.state;
        const urls = urlinfo.URL;
        return (
            <div className="search">
                <div className="searchbody">
                    <div className="searchbarinput">
                        <input type="text" value={search} onChange={e=>this.setState({search: e.target.value})}/>
                        <GoSearch size="24px" onClick={this._onSubmitSearch.bind(this)}/>
                    </div>
                    {data.length === 0? <div className="searchnot">검색 결과가 없습니다.</div>:
                    data.map((im, i) => <div className="searchmain" key={i}><img src={`http://${urls}:3000/api/auth/load/images?name=${im.image}`} alt="search" height="218px" onClick={()=>window.location.href=`/post/${im.pid}`}/></div>)}
                </div>
                <BottomNavContainer />
            </div>
        );
    }
}

export default Search;