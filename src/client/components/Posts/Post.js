import React from "react";
import AddComment from "../Comments/AddComment";
import CommentCard from "../Comments/CommentCard";
import axios from "axios";
import PostCard from "./PostCard";
import {Divider, Grid} from "@material-ui/core";
import Comment from "../Comments/Comment";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import TagsArray from "../Tags/TagsArray";
import AddTag from "../Tags/AddTag";
import Button from "@material-ui/core/Button";
import {Link, Redirect} from "react-router-dom";


class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: [],
            comments: [],
            isAuthor: false,
        };
    }

    componentDidMount() {
        let id = this.props.match.params.id;

        axios.get(`/posts/${id}`).then(res => {
            this.setState({
                post: res.data,
                comments: res.data.comments,
                isAuthor: this.props.userId == res.data.author_id,
            });
        })
    }

    addComment = (comment) => {
        this.setState({
            comments: [comment, ...this.state.comments]
        });

        console.log('Add comment is invoked');
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({
            errorAlert: false,
            isSubmitted: false
        });
    };


    render() {
        const {first_name, last_name, title, content, image, tags, id, author_id} = this.state.post;

        return (
            <Grid container justify="center" style={{minHeight: '80vh'}}>
                <div style={{display: 'flex', flexDirection: 'column', maxWidth: 600, minWidth: 300}}>
                    <Typography>
                        <h1 style={{textAlign: 'center'}}>{title}</h1>
                    </Typography>
                    <Grid item xs={12} sm={6} md={4}>
                        <img src={image}
                             style={{display: 'flex', flexDirection: 'column', width: 600, maxHeight: 400}}/>
                    </Grid>
                    <Grid container justify="flex-end">
                        <Typography variant="h6" fontFamily="Charter">
                            by {first_name} {last_name}
                        </Typography>
                    </Grid>
                    <Typography>
                        <p>{content}</p>
                    </Typography>
                    {this.state.isAuthor
                        ?
                        <Button variant="contained" color='secondary'>
                            <Link
                                style={{textDecoration: 'none', color: 'black'}}
                                to={{
                                    pathname: `/edit-post/${this.state.post.id}`,
                                    state: {
                                        postId: this.state.post.id
                                    }
                                }
                                }> Edit your post </Link>
                        </Button>
                        :
                        null
                    }

                    <TagsArray tags={tags} postId={id}/>
                    <AddComment
                        id={this.props.match.params.id}
                        firstName={first_name}
                        lastName={last_name}
                        authorId={author_id}
                        addComment={this.addComment}
                    />
                    {this.state.comments ? <Comment comments={this.state.comments}/> : null}
                </div>
            </Grid>
        )
    }
}

export default Post;


