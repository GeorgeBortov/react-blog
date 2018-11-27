import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Markup } from 'interweave';
import moment from 'moment';
import Header from './Header';
import CommentForm from './CommentForm';
import CommentListItem from './CommentListItem';
import { startAddComment, startSetComments } from '../actions/posts';


// export const SinglePost = (props) => {
export class SinglePost extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            totalRate: '',
            vote: ''
        }
    }

    onSubmit = (postComment) => {
        this.props.startAddComment(postComment, this.props.post.id);
    }
    componentDidMount() {
        this.props.startSetComments(this.props.post.id).then(() => {
            this.setState(() => ({ vote: this.props.comments.length }));
            
            var totalRate = this.props.comments.reduce(function(prev, cur) {
                return prev + (cur.rate * 1);
            }, 0);
            
            this.setState(() => ({ totalRate }));
        });
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.comments.length !== this.props.comments.length) {
            this.props.startSetComments(this.props.post.id).then(() => {
                this.setState(() => ({ vote: this.props.comments.length }));
                
                var totalRate = this.props.comments.reduce(function(prev, cur) {
                    return prev + (cur.rate * 1);
                }, 0);
                
                this.setState(() => ({ totalRate }));
            });
        }
    }
    render() {
        return (
            <div>
                <Header />
                {
                    this.props.post  ? (
                    <div>
                        <div className="page-header">
                            <div className="content-container">
                                <h1 className="page-header__title">{this.props.post.title}</h1>
                            </div>
                        </div>
                        <div className="content-container">
                            <div className="post-wrap">
                                <div className="post-wrap__text">
                                    <Markup content={this.props.post.body} /> 
                                </div>
                                <div className="post-wrap__data">
                                    <span>Posted by {this.props.post.authorName !== '' ? this.props.post.authorName : 'Anonymous'}</span>
                                    <span>{moment(this.props.post.createdAt).format('MMMM Do YYYY')} at {moment(this.props.post.createdAt).format('h:mm')}</span>
                                </div>
                                <div className="post-wrap__data">
                                    <Link className="button" to={'/'}>Back to Dashboard</Link>
                                    {   
                                        this.props.comments.length !== 0 && (
                                            <div className="star-ratings-wrap">
                                                <div className="star-ratings">
                                                    <span style={{width: (Math.round( (this.state.totalRate/this.state.vote) * 10) / 10)*100/5 + '%'}} className="star-ratings-sprite-rating"></span>
                                                </div>
                                                <span className="score">Rating: {Math.round( (this.state.totalRate/this.state.vote) * 10) / 10}/5 - {this.state.vote} vote</span>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            {
                                this.props.isAuthenticated ? 
                                <div>
                                    <CommentForm
                                    onSubmit={this.onSubmit}
                                    />
                                </div>
                                :
                                <div>
                                    Please <Link id='login' to="/login">login</Link> to write a comment
                                </div>
                            }
                            <h4>Comments</h4>
                            {   
                                this.props.comments.length === 0 ? (
                                    <div>No comments yet</div>
                                ) : (
                                    this.props.comments.reverse().map((comment) => {
                                        return <CommentListItem key={comment.id} {...comment} />
                                    })
                                )
                            }
                            
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
    }
};

const mapStateToProps = (state, props) => ({
    post: state.posts.postsArr.find((post) => post.id === props.match.params.id),
    comments: state.posts.comentsArr,
    isAuthenticated: !!state.auth.uid
});

const mapDispatchToProps = (dispatch) => ({
    startAddComment: (comment, pid) => dispatch(startAddComment(comment, pid)),
    startSetComments: (pid) => dispatch(startSetComments(pid))
});

const ConnectedSinglePost = connect(mapStateToProps, mapDispatchToProps)(SinglePost);

export default ConnectedSinglePost;