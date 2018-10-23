import React from 'react';
import { connect } from 'react-redux';
import Pagination from './Pagination';
import LoadingPage from './LoadingPage';
import BlogListItem from './BlogListItem';
import { setStartAtFilter, setEndAtFilter } from '../actions/filters';
import { startSetPosts } from '../actions/posts';
import { load } from '../actions/loader';

// Add pagination https://scotch.io/tutorials/build-custom-pagination-with-react

export class BlogList extends React.Component {

    state = {currentPage: null, totalPages: null }

    onPageChanged = data => {
        const { currentPage, totalPages, pageLimit } = data;
    
        const startAt = (currentPage - 1) * pageLimit;
        const endAt = startAt + pageLimit;
        
        if(startAt!==this.props.startAt && endAt!==this.props.endAt) {
            this.props.load(true);
            this.props.setStartAtFilter(startAt);
            this.props.setEndAtFilter(endAt);
            this.props.startSetPosts(startAt, endAt).then(() => {
                this.props.load(false);
            });
        } 
        
        this.setState({ currentPage, totalPages });
    }
   
    render() {
        const {currentPage, totalPages} = this.state;
        return (
            <div className="content-container">
                {
                    this.props.loader === true  ? (<LoadingPage />) :
                    (
                        <div className="list-body">
                            {   
                                this.props.posts.length === 0 ? (
                                    <div className="list-item list-item--message">
                                        <span>No posts</span>
                                    </div>
                                ) : (
                                    this.props.posts.map((post) => {
                                        return <BlogListItem key={post.id} {...post} />
                                    })
                                )
                            }
                        </div>
                    )
                }
                <div className="pagination-wrap">
                    { currentPage !== 0 && (
                        <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                            Page <span className="font-weight-bold">{ currentPage }</span> / <span className="font-weight-bold">{ totalPages }</span>
                        </span>
                    ) }
                    <Pagination pageLimit={10} pageNeighbours={1} currentPage={this.props.currentPage} onPageChanged={this.onPageChanged} />
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    posts: state.posts.postsArr,
    startAt: state.filters.startAt,
    endAt: state.filters.endAt,
    postTotalNumb: state.posts.postTotalNumb,
    currentPage: state.filters.currentPage,
    loader: state.loader.load ? state.loader.load : false
});
const mapDispatchToProps = (dispatch) => ({
    setStartAtFilter: (startAt) => dispatch(setStartAtFilter(startAt)),
    setEndAtFilter: (endAt) => dispatch(setEndAtFilter(endAt)),
    startSetPosts: (startAt, endAt) => dispatch(startSetPosts(startAt, endAt)),
    load: (bool) => dispatch(load(bool))
});

const ConnectedBlogList = connect(mapStateToProps, mapDispatchToProps)(BlogList);

export default ConnectedBlogList;