import React from 'react';
import { connect } from 'react-redux';
import JoditEditor from "jodit-react";
import moment from 'moment';

export class BlogForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rate: props.post ? props.post.body : '',
            body: props.post ? props.post.body : '',
            createdAt: moment(),
            authorName: props.userName,
            error: ''
        }
        this.baseState = this.state
    }
    handleRateChange = (e) => {
        const rate = e.target.value;
        this.setState(() => ({ rate })); 
    };
    onAuthorChange = (e) => {
        const authorName = e.target.value;
        this.setState(() => ({ authorName }));
    };
    onBodyChange = (value) => {
        const body = value;
        this.setState(() => ({ body }));
    };
    onSubmit = (e) => {
        e.preventDefault();

        if (!this.state.authorName || !this.state.body || !this.state.rate) {
            // 'Please provide description and amount'
            this.setState(() => ({ error: 'Please fill in all fields and rate the post' }));
        } else {
            e.target.reset();
            this.props.onSubmit({
                rate: this.state.rate,
                body: this.state.body,
                createdAt: this.state.createdAt.valueOf(),
                authorName: this.state.authorName
            });
            this.setState(this.baseState);    
        }
    };
    config = {
		readonly: false // all options from https://xdsoft.net/jodit/doc/
	}
    render() {
        return (
            <div className="comment-form">
                
                <h4>Write a commpent</h4>
                
                <form className="form" onSubmit={this.onSubmit}>
                    {this.state.error && <p className="form__error">{this.state.error}</p>}
                    <span className="rating">
                        <input type="radio" id="star5" name="rating" value="5" onBlur={this.handleRateChange}  /><label htmlFor="star5" title="Rocks!">5 stars</label>
                        <input type="radio" id="star4" name="rating" value="4" onBlur={this.handleRateChange}  /><label htmlFor="star4" title="Pretty good">4 stars</label>
                        <input type="radio" id="star3" name="rating" value="3" onBlur={this.handleRateChange}  /><label htmlFor="star3" title="Meh">3 stars</label>
                        <input type="radio" id="star2" name="rating" value="2" onBlur={this.handleRateChange}  /><label htmlFor="star2" title="Kinda bad">2 stars</label>
                        <input type="radio" id="star1" name="rating" value="1" onBlur={this.handleRateChange}  /><label htmlFor="star1" title="Sucks big time">1 star</label>
                        <span className="txt">Please rate:</span>
                    </span>
                    {
                        !this.props.userName &&
                        <input
                            type="text"
                            placeholder="Your name"
                            className="text-input form--author"
                            value={this.state.authorName}
                            onChange={this.onAuthorChange}
                        />
                    }
                    <JoditEditor
                        editorRef={this.setRef}
                        value={this.state.body}
                        config={this.config}
                        onChange={this.onBodyChange}
                    /> 
                    <div>
                        <button className="button">Publish</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    userName: state.auth.name || state.auth.email
});

export default connect(mapStateToProps, undefined)(BlogForm);