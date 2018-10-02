import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import trimText from '../selectors/trim-text';
export const BlogListItem = ({ id, title, trimText, authorName, createdAt, uid, authorID, }) => (
    <div className="list-item">
        <div>
            <h3 className="list-item__title">{title}</h3>
            <div className="list-item__text">
                {trimText}
            </div>
        </div>
        <div className="list-item__data">
            <span className="list-item__author">Posted by {authorName !== '' ? authorName : 'Anonymous'}</span>
            <span className="list-item__time">{moment(createdAt).format('MMMM Do YYYY')} at {moment(createdAt).format('h:mm')}</span>
        </div>
        <div className="list-item__buttons">
            <Link className="button" to={`/read/${id}`}>Read</Link>
            {   
                uid === authorID &&
                    <Link className="button" to={`/edit/${id}`}>Edit</Link>
                
            }
            
        </div>
    </div>
    
);

const mapStateToProps = (state, ownProps) => ({
    uid: state.auth.uid,
    trimText: trimText(ownProps.body, 500)
});

const ConnectedBlogListItem = connect(mapStateToProps)(BlogListItem);

export default ConnectedBlogListItem;