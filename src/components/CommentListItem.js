import React from 'react';
import moment from 'moment';
import { Markup } from 'interweave';
export const CommentListItem = ({ authorName, body, createdAt, rate }) => (
    <div className="list-item">
        <div>
            <div className="star-ratings-wrap">
                <div className="star-ratings">
                    <span style={{width: rate*100/5 + '%'}} className="star-ratings-sprite-rating"></span>
                </div>
                <span className="score">Rating: {rate}/5</span>
            </div>
            <div className="list-item__text">
                <Markup content={body} />
            </div>
        </div>
        <div className="list-item__data">
            <span className="list-item__author">Posted by {authorName !== '' ? authorName : 'Anonymous'}</span>
            <span className="list-item__time">{moment(createdAt).format('MMMM Do YYYY')} at {moment(createdAt).format('h:mm')}</span>
            
        </div>
    </div>
    
);


export default CommentListItem;