import React from 'react';
import { connect } from 'react-redux';
import BlogListItem from './BlogListItem';


export const BlogList = (props) => {
    return (
        <div className="content-container">
            <div className="list-body">
                {   
                    props.posts.length === 0 ? (
                        <div className="list-item list-item--message">
                            <span>No posts</span>
                        </div>
                    ) : (
                        props.posts.map((post) => {
                            return <BlogListItem key={post.id} {...post} />
                        })
                    )
                }
            </div>
        </div>
    )
};

const mapStateToProps = (state) => ({
    posts: state.posts
});

const ConnectedBlogList = connect(mapStateToProps)(BlogList);

export default ConnectedBlogList;