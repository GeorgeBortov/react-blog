import React from 'react';
import { connect } from 'react-redux';
import BlogListItem from './BlogListItem';
import selectPosts from '../selectors/select-posts';

// Add pagination https://scotch.io/tutorials/build-custom-pagination-with-react

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
    posts: selectPosts(state.posts, state.filters)
});

const ConnectedBlogList = connect(mapStateToProps)(BlogList);

export default ConnectedBlogList;