import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setTitleFilter, setDateAscFilter, setDateDescFilter, setAuthorIDFilter, setStartAtFilter, setEndAtFilter } from '../actions/filters';
import { startSetPosts } from '../actions/posts';
import { load } from '../actions/loader';

export class BlogFilters extends React.Component {
    constructor(props) {
        super(props);
    
        //Timer
        this.typingTimeout = null;
    
        //Event
        this.onTitleChange = this.onTitleChange.bind(this);
    
    }   

    onTitleChange = (e) => {
        clearTimeout(this.typingTimeout);
        this.typingTimeout = setTimeout( () => {
            this.props.load(true);
            this.props.startSetPosts(this.props.startAt, this.props.endAt).then(() => {
                this.props.load(false);
            });
        }, 475);
        this.props.setTitleFilter(e.target.value);
        
    };
    onSortChange = (e) => {
        if (e.target.value === 'dateASC') {
            this.props.setDateAscFilter();
            this.props.load(true);
            this.props.startSetPosts(this.props.startAt, this.props.endAt).then(() => {
                this.props.load(false);
            });
        } else if (e.target.value === 'dateDESC') {
            this.props.setDateDescFilter();
            this.props.load(true);
            this.props.startSetPosts(this.props.startAt, this.props.endAt).then(() => {
                this.props.load(false);
            });
        } else if (e.target.value === 'authorID') {
            this.props.setAuthorIDFilter(this.props.uid);
            this.props.load(true);
            this.props.startSetPosts(this.props.startAt, this.props.endAt).then(() => {
                this.props.load(false);
            });
        }
    };
    render() {
        return (
            <div className="page-header">
                <div className="content-container">
                    <form>
                        <div className="input-group">
                            <div className="input-group__item">
                                <input
                                    type="text"
                                    className="text-input"
                                    placeholder="Search posts by title"
                                    value={this.props.filters.title}
                                    onChange={this.onTitleChange}
                                />
                            </div>
                            <div className="input-group__item">
                                <select
                                    className="select"
                                    value={this.props.filters.sortBy}
                                    onChange={this.onSortChange}
                                >
                                    <option value="dateASC">Sort by date (ASC order)</option>
                                    <option value="dateDESC">Sort by date (DESC order)</option>
                                    {
                                        this.props.uid &&
                                        <option value="authorID">Select only my posts</option>
                                    }
                                    
                                </select>
                            </div>
                        </div>
                    </form>
                    {
                        this.props.uid &&
                        <Link className="button" to="/create">Add Post</Link>
                    }
                    
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    uid: state.auth.uid,
    filters: state.filters,
    startAt: state.filters.startAt,
    endAt: state.filters.endAt
});

const mapDispatchToProps = (dispatch) => ({
    setTitleFilter: (text) => dispatch(setTitleFilter(text)),
    setDateAscFilter: () => dispatch(setDateAscFilter()),
    setDateDescFilter: () => dispatch(setDateDescFilter()),
    setStartAtFilter: (startAt) => dispatch(setStartAtFilter(startAt)),
    setEndAtFilter: (endAt) => dispatch(setEndAtFilter(endAt)),
    startSetPosts: (startAt, endAt) => dispatch(startSetPosts(startAt, endAt)),
    setAuthorIDFilter: (authorID) => dispatch(setAuthorIDFilter(authorID)),
    load: (bool) => dispatch(load(bool))
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogFilters);