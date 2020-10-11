import React from 'react';
import axios from 'axios';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {Divider} from "@material-ui/core";
import AddTag from "./AddTag";
import TagsArray from "./TagsArray";
import Redirect from "react-router-dom/es/Redirect";
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    button: {
        margin: theme.spacing(1),
    },
});


class EditPost extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            postId: this.props.match.params.id,
            title: undefined,
            content: undefined,
            authorId: undefined,
            image: undefined,
            tags: undefined
            //why undefined and why null?
        };
    }

    onChange = e => this.setState({...this.state, [e.target.name]: e.target.value});


    onSubmit = (e) => {
        e.preventDefault();
        const {userId} = this.props.location.state;
        const {title, content, image} = this.state;
        const data = {
            title: title,
            content: content,
            authorId: userId,
            image: image,
            isUpdated: false,
            isDeleted: false
        };

        let id = this.props.match.params.id;

        axios.put(`/edit-post/${id}`, data).then(res => {
            //const post = res.data;
            this.setState({ isUpdated: true });
            console.log(res.data);
        })
    };

    onDelete = e =>{
        e.preventDefault();
        let id = this.props.match.params.id;

        axios.delete(`/posts/${id}`).then(res => {
            this.setState({isDeleted: true})
        }).catch(err => {
            console.log("Error during deletion of the post")
        });
    };

    componentDidMount() {
        let id = this.props.match.params.id;
        axios.get(`/posts/${id}`).then(res => {
            const post = res.data;
            console.log(post);
            this.setState({
                title: post.title,
                content: post.content,
                authorId: post.authorId,
                image: post.image,
                tags: post.tags
            });
        })
    }

    addTag = (tag) => {
        this.setState({
            tags: [...this.state.tags, tag]
        });

        console.log('AddTag invoked');
    };

    handleDelete = (tagToDelete) => () => {
        this.setState({chips: (tags) => tags.filter((chip) => chip.key !== tagToDelete.key)});

        const { label } = tagToDelete;
        let id = this.state.postId;
        console.log(id);
        axios.post(`/posts/${id}/tags/${label}`).then(res => {
            // this.setState({
            //     tags: res.data,
            // });
            this.setState({tags: this.state.tags.filter((tag) => tag.label !== tagToDelete.label)});
        })
        console.log('handle detele');
    };

    onClick = (tag) => () => {
        console.log(tag);
        this.setState({
            currentTag: tag,
            isClicked: true
        })
    };

    render() {
        let id = this.props.match.params.id;

        const {classes} = this.props;

        if(this.state.isDeleted){
            return (<Redirect to={`/`}/>)
        }

        if(this.state.isUpdated){
            return (<Redirect to={`/post/${id}`}/>)
        }

        const {title, image, content, authorId} = this.state;
        return (
            <Grid container justify="center" style={{minHeight: '80vh'}}>
                <div style={{display: 'flex', flexDirection: 'column', maxWidth: 600, minWidth: 500, marginTop: 100}}>
                    <Grid container justify='center'>
                        <Typography component="h1" variant="h3">
                            Edit your post
                        </Typography>
                    </Grid>
                    <form>
                        <Grid item xs={12} sm={6} md={6}>
                            <TextField
                                id="standard-read-only-input"
                                //label="Title"
                                multiline
                                rowsMax={4}
                                placeholder="Give it a good name..."
                                variant="outlined"
                                onChange={this.onChange}
                                value={title}
                                name="title"
                                style={{width: 600, marginTop: '15px'}}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="standard-multiline-static"
                                //label="Content"
                                multiline
                                rows={8}
                                placeholder="Write your thoughts here..."
                                variant="outlined"
                                onChange={this.onChange}
                                value={content}
                                name="content"
                                style={{width: 600, marginTop: '10px'}}
                            />
                        </Grid>
                        <Grid>
                            <TextField
                                id="filled-helperText"
                                //label="Link"
                                placeholder="https://image-you-want-to-add.com"
                                helperText="Add your images URL here"
                                variant="outlined"
                                onChange={this.onChange}
                                value={image}
                                name="image"
                                style={{width: 600, marginTop: '10px'}}
                            />
                        </Grid>
                        <AddTag id={id} addTag={this.addTag}/>
                        <Divider/>
                        {this.state.tags ? ((this.state.tags.length > 0) && <TagsArray tags={this.state.tags} postId={id} handleDelete={this.handleDelete}/>) : null}

                        <Grid container justify="flex-end" style={{marginTop: '10px'}}>
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                onClick={this.onDelete}
                                startIcon={<DeleteIcon />}
                            >
                                Delete
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                type="submit"
                                className={classes.button}
                                startIcon={<SaveIcon />}
                                onClick={this.onSubmit}
                            >
                                Save post
                            </Button>
                        </Grid>
                    </form>
                </div>
            </Grid>
        )
    }
}

export default withStyles(styles, { withTheme: true })(EditPost);
