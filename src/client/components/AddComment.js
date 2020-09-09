import React from 'react';
import axios from 'axios';

class AddComment extends React.Component {

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
            post_id: this.props.id,
            author_id: 1 //change to current user
        };

        let id = this.props.id;
        console.log(id);

        axios.post(`/posts/${id}/comments`, data).then(res => {
            const comment = res.data;
            this.setState({
                title: '',
                content: ''
            });
        });

        //should be a better way
        window.location.reload(false);
    };

    render() {
        return (
            <div className="post-form">
                <h2>Add comment</h2>
                <p>
                    <form>
                        <input type="text" placeholder="Comment title goes here..." onChange={this.onTitleChange} value={this.state.title}></input>
                        <br/><br/>
                        <textarea rows="8" cols="50" placeholder="Comment content goes here..." onChange={this.onContentChange} value={this.state.content}></textarea>
                        <br/><br/>
                        <button className="button" type="submit" onClick={this.onSubmit}>Add comment</button>
                    </form>
                </p>
            </div>
        )

    }
}

export default AddComment;
