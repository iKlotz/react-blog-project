import React from 'react';
import axios from 'axios';


class NewPost extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: undefined,
            content: undefined,
            author: undefined,
        };
    }

    onTitleChange = (e) => {
        this.setState({
            title: e.target.value,
        })
    };
    onContentChange = (e) => {
        this.setState({
            content: e.target.value,
        })
    };

    onSubmit = (e) => {
        e.preventDefault();
        const data = {
            title: this.state.title,
            content: this.state.content,
            author: this.state.author,
        };

        axios.post('/posts', data).then(res => {
            //const post = res.data;
            this.setState({
                title: '',
                content: '',
                author:''
            });
        })
    };

    render() {
        return (
            <div className="post-form">
                <h1>Create new post</h1>
                <p>
                    <form>
                        <input type="text" placeholder=" Post title goes here..." onChange={this.onTitleChange} value={this.state.title}></input>
                        <br/><br/>
                        <textarea rows="8" cols="50" placeholder="Post content goes here..." onChange={this.onContentChange} value={this.state.content}></textarea>
                        <br/><br/>
                        <button className="button" type="submit" onClick={this.onSubmit}>Save post</button>
                    </form>
                </p>
            </div>
        )

    }
}

export default NewPost;
