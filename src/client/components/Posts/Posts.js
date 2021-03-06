import React from 'react';
import PostCard from './PostCard';
import axios from "axios";
import Grid from "@material-ui/core/Grid";

class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
    }

    componentDidMount() {
        axios.get('/posts').then(res => {
            this.setState({
                posts: res.data,
            });
        }).catch((err) => {
                console.log(err)
                console.log("Error during fetching posts");
        })
    }


    render() {
        return this.state.posts.map(function (post) {
            return <PostCard
                title={post.title + '...'}
                content={post.content + '...'}
                image={post.image}
                published={post.published}
                author={post.first_name + ' ' + post.last_name}
                id={post.id}
            />
        })
    }
}

export default Posts;