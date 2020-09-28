import React from 'react';
import PostCard from './PostCard';
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import MainFeaturedPost from "./MainFeaturedPost";
import Posts from "./Posts";
import Container from "@material-ui/core/Container";
import Redirect from "react-router-dom/es/Redirect";
import {fade, withStyles} from "@material-ui/core";



class Search extends React.Component {

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
        axios.get(`/search/${query}`).then(res => {
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
            axios.get(`/search/${query}`).then(res => {
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
                image={post.image}
                published={post.published}
                author={post.first_name + ' ' + post.last_name}
                id={post.id}
            />
            );
        })

    }
}

export default Search;
