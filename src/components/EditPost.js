import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import BlogForm from './BlogForm';
import ConfirmModal from './ConfirmModal';
import LoadingPage from './LoadingPage';
import { startEditPost, startRemovePost, startSetPosts } from '../actions/posts';
import { setStartAtFilter, setEndAtFilter } from '../actions/filters';
import { openModal, closeModal } from '../actions/modal';
import { load } from '../actions/loader';

export class EditPost extends React.Component {
    onSubmit = (post) => {
        this.props.startEditPost(this.props.post.id, post);
        this.props.history.push('/');
    }
    onRemove = () => {
        this.props.load(true);
        this.props.startRemovePost({ id: this.props.post.id }).then(() => {
            this.props.closeModal();
            if(this.props.posts.length > 0) {
                this.props.startSetPosts(this.props.startAt, this.props.endAt).then(() => {
                    this.props.history.push('/');
                    this.props.load(false);
                });
            } else {
                this.props.history.push('/');
            }
              
        });
    }
    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Edit Post</h1>
                    </div>
                </div>
                {
                    this.props.loader === true  ? (<LoadingPage />) :
                    (
                        this.props.post ? (
                            this.props.uid === this.props.post.authorID ?
                            <div className="content-container">
                                <BlogForm
                                    post={this.props.post}
                                    onSubmit={this.onSubmit}
                                />
                                <button className="button button--secondary" onClick={this.props.openModal}>Remove Expense</button>
                                <ConfirmModal
                                    isOpen={this.props.modalStatus}
                                    onRequestClose={this.props.closeModal}
                                    postTitle={this.props.post.title}
                                    onRemove={this.onRemove}
                                />
                            </div> 
                            :
                            <div className="content-container">
                                <p className="message">
                                    You don't allowed to edit this post
                                </p>
                                <Link className="button" to={'/'}>Back to Dashboard</Link>
                            </div>
                        ) : (
                                <div className="content-container">
                                    <p className="message">
                                        This post does not exist
                                    </p>
                                    <Link className="button" to={'/'}>Back to Dashboard</Link>
                                </div>
                        )
                    )
                }
            </div>
        );
    }
};

const mapStateToProps = (state, props) => ({
    post: state.posts.postsArr.find((post) => post.id === props.match.params.id),
    modalStatus: state.modal.modalIsOpen,
    startAt: state.filters.startAt,
    endAt: state.filters.endAt,
    posts: state.posts.postsArr,
    uid: state.auth.uid,
    loader: state.loader.load ? state.loader.load : false
});

const mapDispatchToProps = (dispatch, props) => ({
    startEditPost: (id, post) => dispatch(startEditPost(id, post)),
    startRemovePost: (data) => dispatch(startRemovePost(data)),
    startSetPosts: (startAt, endAt) => dispatch(startSetPosts(startAt, endAt)),
    startCountPosts: () => dispatch(startCountPosts()),
    setStartAtFilter: (startAt) => dispatch(setStartAtFilter(startAt)),
    setEndAtFilter: (endAt) => dispatch(setEndAtFilter(endAt)),
    openModal: () => dispatch(openModal()),
    closeModal: () => dispatch(closeModal()),
    load: (bool) => dispatch(load(bool))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);