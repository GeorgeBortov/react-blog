import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export class BlogFilters extends React.Component {
    state = {
        
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
                                    // value={this.props.filters.text}
                                    // onChange={this.onTextChange}
                                />
                            </div>
                            <div className="input-group__item">
                                <select
                                    className="select"
                                    // value={this.props.filters.sortBy}
                                    // onChange={this.onSortChange}
                                >
                                    <option value="date">Sort by date</option>
                                    <option value="cur_user">Select only my posts</option>
                                </select>
                            </div>
                        </div>
                    </form>
                    <Link className="button" to="/create">Add Post</Link>
                </div>
            </div>
        )
    }
}



export default connect(undefined, undefined)(BlogFilters);