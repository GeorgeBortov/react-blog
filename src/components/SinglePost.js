import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Markup } from 'interweave';
import moment from 'moment';
import Header from './Header';

export const SinglePost = (props) => {
    return (
        <div>
            <Header />
            {
                props.post  ? (
                <div>
                    <div className="page-header">
                        <div className="content-container">
                            <h1 className="page-header__title">{props.post.title}</h1>
                        </div>
                    </div>
                    <div className="content-container">
                        <div className="post-wrap">
                            <div className="post-wrap__text">
                                <Markup content={props.post.body} /> 
                            </div>
                            <div className="post-wrap__data">
                                <span>Posted by {props.post.authorName !== '' ? props.post.authorName : 'Anonymous'}</span>
                                <span>{moment(props.post.createdAt).format('MMMM Do YYYY')} at {moment(props.post.createdAt).format('h:mm')}</span>
                            </div>
                            <Link className="button" to={'/'}>Back to Dashboard</Link>
                        </div>
                    </div>
                </div>
                ) : (
                    <div className="content-container">
                        <p className="message">
                            This post does not exist
                        </p>
                        <Link className="button" to={'/'}>Back to Dashboard</Link>
                    </div>
                )
            }
        </div>

    )
};

const mapStateToProps = (state, props) => ({
    post: state.posts.find((post) => post.id === props.match.params.id),

});

const ConnectedSinglePost = connect(mapStateToProps)(SinglePost);

export default ConnectedSinglePost;