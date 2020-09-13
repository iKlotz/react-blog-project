import React from "react";
import AddComment from "../components/AddComment";
import CommentCard from "../components/CommentCard";
import axios from "axios";
import PostCard from "../components/PostCard";
import {Divider, Grid} from "@material-ui/core";
import Comment from "../components/Comment";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";


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

        const {author, title, content, comments, image} = this.state.post;

        return (
            <Grid container justify="center" style={{minHeight: '80vh'}}>
                <div style={{display: 'flex', flexDirection: 'column', maxWidth: 600, minWidth: 300}}>
                    <Typography>
                        <h1>{title}</h1>
                    </Typography>
                    <Grid item xs={12} sm={6} md={4}>
                        <img src={image}
                             style={{display: 'flex', flexDirection: 'column', width: 600, maxHeight: 400}}/>
                    </Grid>
                    <Grid container justify="flex-end">
                        <Typography variant="h6" fontFamily="Charter">
                            by {author}
                        </Typography>
                    </Grid>
                    <Typography>
                        <p>{content}</p>
                    </Typography>
                    <AddComment id={this.props.match.params.id}/>
                    <Divider/>
                    {comments ? <Comment comments={comments}/> : <CircularProgress/>}
                </div>
            </Grid>
        )
    }
}

export default Post;


