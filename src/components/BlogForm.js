import React from 'react';
import { connect } from 'react-redux';
import JoditEditor from "jodit-react";
import moment from 'moment';

export class BlogForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: props.post ? props.post.title : '',
            body: props.post ? props.post.body : '',
            createdAt: moment(),
            authorName: props.userName ? props.userName : (props.post.authorName ? props.post.authorName : '' ),
            error: ''
        }
    }
    onTitleChange = (e) => {
        const title = e.target.value;
        this.setState(() => ({ title }));
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

        if (!this.state.title || !this.state.body) {
            // 'Please provide description and amount'
            this.setState(() => ({ error: 'Please provide title and post body' }));
        } else {
            this.setState(() => ({ error: '' }));
            this.props.onSubmit({
                title: this.state.title,
                body: this.state.body,
                createdAt: this.state.createdAt.valueOf(),
                authorName: this.state.authorName
            });
        }
    };
    config = {
		readonly: false // all options from https://xdsoft.net/jodit/doc/
	}
    render() {
        return (
            <form className="form" onSubmit={this.onSubmit}>
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                <input
                    type="text"
                    placeholder="Post title"
                    autoFocus
                    className="text-input form--title"
                    value={this.state.title}
                    onChange={this.onTitleChange}
                />
                <JoditEditor
                    editorRef={this.setRef}
                    value={this.state.body}
                    config={this.config}
                    onChange={this.onBodyChange}
                />
                {
                    !this.props.userName &&
                    <input
                        type="text"
                        placeholder="Author"
                        className="text-input form--author"
                        value={this.state.authorName}
                        onChange={this.onAuthorChange}
                    />
                }
                
                <div>
                    <button className="button">Save Post</button>
                </div>
            </form>
        )
    }
}

const mapStateToProps = (state) => ({
    userName: state.auth.name || ''
});

export default connect(mapStateToProps, undefined)(BlogForm);