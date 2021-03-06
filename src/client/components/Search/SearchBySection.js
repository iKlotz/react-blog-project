import React from 'react';
import PostCard from '../Posts/PostCard';
import axios from "axios";



class SearchBySection extends React.Component {

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
        axios.get(`/search/section/${query}`).then(res => {
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
            axios.get(`/search/section/${query}`).then(res => {
                this.setState({
                    isLoading: false,
                    posts: res.data,
                    query: query
                });
            })
        }
    }


    render() {
        const { posts, isLoading } = this.state;

        return (!isLoading && posts.length == 0) ? <h1>No posts in this section</h1> : posts.map(function (post) {
            return(
                <PostCard
                    title={post.title + "..."}
                    image={post.image}
                    content={post.content}
                    published={post.published}
                    author={post.first_name + ' ' + post.last_name}
                    id={post.id}
                />
            );
        })
    }
}

export default SearchBySection;
