import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import BlogForm from './BlogForm';
import ConfirmModal from './ConfirmModal';
import { startEditPost, startRemovePost } from '../actions/posts';
import { openModal, closeModal } from '../actions/modal';

export class EditPost extends React.Component {
    onSubmit = (post) => {
        this.props.startEditPost(this.props.post.id, post);
        this.props.history.push('/');
    }
    onRemove = () => {
        this.props.startRemovePost({ id: this.props.post.id });
        this.props.closeModal();
        this.props.history.push('/');
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
                            <Link className="button" to={'/dashboard'}>Back to Dashboard</Link>
                        </div>
                    ) : (
                            <div className="content-container">
                                <p className="message">
                                    This post does not exist
                                </p>
                                <Link className="button" to={'/dashboard'}>Back to Dashboard</Link>
                            </div>
                        )
                }
            </div>
        );
    }
};

const mapStateToProps = (state, props) => ({
    post: state.posts.find((post) => post.id === props.match.params.id),
    modalStatus: state.modal.modalIsOpen,
    uid: state.auth.uid

});

const mapDispatchToProps = (dispatch, props) => ({
    startEditPost: (id, post) => dispatch(startEditPost(id, post)),
    startRemovePost: (data) => dispatch(startRemovePost(data)),
    openModal: () => dispatch(openModal()),
    closeModal: () => dispatch(closeModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);