import React from 'react';
import { connect } from 'react-redux';
import BlogForm from './BlogForm';
import LoadingPage from './LoadingPage';
import { startAddPost, startSetPosts } from '../actions/posts';
import { setStartAtFilter, setEndAtFilter } from '../actions/filters';
import { load } from '../actions/loader';

export class AddPost extends React.Component {
    onSubmit = (post) => {
        this.props.load(true);
        this.props.startAddPost(post).then(() => {
            this.props.startSetPosts(this.props.startAt, this.props.endAt).then(() => {
                this.props.history.push('/');
                this.props.load(false);
            });
        });
    }
    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Add post</h1>
                    </div>
                </div>
                <div className="content-container">
                {
                    this.props.loader === true  ? (<LoadingPage />) :
                    (
                    <BlogForm
                        onSubmit={this.onSubmit}
                    />
                    )
                }
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    startAt: state.filters.startAt,
    endAt: state.filters.endAt,
    loader: state.loader.load ? state.loader.load : false
    
});
const mapDispatchToProps = (dispatch) => ({
    startAddPost: (post) => dispatch(startAddPost(post)),
    setStartAtFilter: (startAt) => dispatch(setStartAtFilter(startAt)),
    setEndAtFilter: (endAt) => dispatch(setEndAtFilter(endAt)),
    startSetPosts: (startAt, endAt) => dispatch(startSetPosts(startAt, endAt)),
    load: (bool) => dispatch(load(bool))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);