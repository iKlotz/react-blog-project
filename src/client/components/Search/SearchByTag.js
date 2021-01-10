import React from 'react';
import PostCard from '../Posts/PostCard';
import axios from "axios";

class SearchByTag extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            query: '',
            posts: []
        };
    }

    componentDidMount() {
        let query = this.props.match.params.query;
        axios.get(`/search/tag/${query}`).then(res => {
            this.setState({
                isLoading: false,
                posts: res.data,
                query: query
            });
        })
    }

    componentDidUpdate() {
        if (this.props.match.params.query !== this.state.query) {
            let query = this.props.match.params.query;
            axios.get(`/search/tag/${query}`).then(res => {
                this.setState({
                    isLoading: false,
                    posts: res.data,
                    query: query
                });
            })
        }
    }


    render() {
        const { posts } = this.state;
        return posts.map(function (post) {
            return(
                <PostCard
                    title={post.title}
                    content={post.content + '...'}
                    image={post.image}
                    published={post.published}
                    author={post.first_name + ' ' + post.last_name}
                    id={post.id}
                />
            );
        })
    }
}

export default SearchByTag;
