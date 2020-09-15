import React from 'react';
import PostCard from './PostCard';
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import MainFeaturedPost from "./MainFeaturedPost";
import Posts from "./Posts";
import Container from "@material-ui/core/Container";

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            posts: []
        };
    }

    componentDidMount() {
        let query = this.props.match.params.query;
        //let query = "no";
        axios.get(`/search/${query}`).then(res => {
            this.setState({
                isLoading: false,
                posts: res.data,
            });
        })
    }


    render() {
        return this.state.posts.map(function (post) {
            return(
                <PostCard
                title={post.title}
                content={post.content}
                image={post.image}
                published={post.published}
                author={post.author}
                id={post.id}
            />
            );
        })
    }
}

export default Search;


{/*<Container maxWidth="false" className={classes.blogsContainer}>*/}
{/*    /!*<Typography variant="h4" className={classes.blogTitle}>*!/*/}
{/*    /!*    Articles*!/*/}
{/*    /!*</Typography>*!/*/}
{/*    <MainFeaturedPost post={mainFeaturedPost} />*/}


{/*    <Grid container spacing={3}>*/}
{/*        <Posts/>*/}
{/*    </Grid>*/}
{/*</Container>*/}