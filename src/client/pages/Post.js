import React from "react";
import AddComment from "../components/AddComment";
import CommentCard from "../components/CommentCard";
import axios from "axios";
import PostCard from "../components/PostCard";

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: []
        };
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        axios.get(`/posts/${id}`).then(res => {
            this.setState({
                post: res.data,
            });
        })

    }

    render() {

        const { title, content, comments } = this.state.post;

        return (
            <div>
                <h1>{title}</h1>
                <p>{content}</p>
                <AddComment id={this.props.match.params.id}/>
                {comments ? comments.map(comment =>
                    <CommentCard
                        title = {comment.title}
                        content = {comment.content}
                        published = {comment.published_at}
                    />)
                    : null }
            </div>
        )
    }
}

export default Post;


