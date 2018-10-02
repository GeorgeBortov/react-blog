import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setTitleFilter, setDateAscFilter, setDateDescFilter, setAuthorIDFilter } from '../actions/filters';

export class BlogFilters extends React.Component {
    onTitleChange = (e) => {
        this.props.setTitleFilter(e.target.value);
    };
    onSortChange = (e) => {
        if (e.target.value === 'dateASC') {
            this.props.setDateAscFilter();
        } else if (e.target.value === 'dateDESC') {
            this.props.setDateDescFilter();
        } else if (e.target.value === 'authorID') {
            this.props.setAuthorIDFilter(this.props.uid);
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

const mapStateToProps = (state, ownProps) => ({
    uid: state.auth.uid,
    filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
    setTitleFilter: (text) => dispatch(setTitleFilter(text)),
    setDateAscFilter: () => dispatch(setDateAscFilter()),
    setDateDescFilter: () => dispatch(setDateDescFilter()),
    setAuthorIDFilter: (authorID) => dispatch(setAuthorIDFilter(authorID))
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogFilters);