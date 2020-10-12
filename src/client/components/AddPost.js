import React from 'react';
import axios from 'axios';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {Divider} from "@material-ui/core";
import AddTag from "./AddTag";
import TagsArray from "./TagsArray";
import Alert from '@material-ui/lab/Alert';
import {Redirect} from 'react-router-dom';
import Sections from "./Sections";


class NewPost extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            postId: this.props.match.params.id,
            title: null,
            content: "",
            authorId: null,
            image: null,
            tags: [],
            isSubmitted: false,
            errorAlert: false

        };
    }

    componentDidMount() {
        const {userId} = this.props.location.state;
        const {title, content, image} = this.state;
        const data = {
            title: title,
            content: content,
            authorId: userId,
            image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            status: 'draft'
        };


        axios.post('/posts', data).then(res => {
            //const post = res.data;
            console.log(res.data);
            this.setState({
                postId: res.data.post_id,
                title: '',
                content: '',
                authorId: userId,
                image: '',
            });
        }).catch(err => {
            this.setState({errorAlert: true})
        })
    }

    onChange = e => this.setState({...this.state, [e.target.name]: e.target.value});

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
            this.setState({tags: this.state.tags.filter((tag) => tag.label !== tagToDelete.label)});
        });
        console.log('handle detele');
    };



    onSubmit = (e) => {
        e.preventDefault();
        const {userId} = this.props.location.state;
        const {title, content, image, postId} = this.state;
        const data = {
            title: title,
            content: content,
            authorId: userId,
            image: image ? image : 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            postId: postId
        };


        axios.put('/posts', data).then(res => {
            //const post = res.data;
            console.log(res.data);
            this.setState({
                title: '',
                content: '',
                authorId: '',
                image: '',
                isSubmitted: true
            });
        }).catch(err => {
            this.setState({errorAlert: true})
        })
    };

    render() {
        const {title, image, content, isSubmitted, errorAlert, postId} = this.state;

        if (isSubmitted) {
            return <Redirect to="/"/>
        }

        return (
            <Grid container justify="center" style={{minHeight: '80vh'}}>
                <div style={{display: 'flex', flexDirection: 'column', maxWidth: 600, minWidth: 500, marginTop: 50}}>
                    <Grid container justify='center'>
                        <Typography component="h1" variant="h3">
                            Create your post
                        </Typography>
                    </Grid>
                    <form>
                        <Grid item xs={12} sm={6} md={6}>
                            <TextField
                                id="standard-multiline-static"
                                label="Title"
                                multiline
                                rowsMax={4}
                                placeholder="Give it a good name..."
                                variant="outlined"
                                onChange={this.onChange}
                                value={title}
                                name="title"
                                required="true"
                                style={{width: 600, marginTop: '15px'}}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="standard-multiline-static"
                                label="Content"
                                multiline
                                rows={8}
                                placeholder="Write your thoughts here..."
                                variant="outlined"
                                onChange={this.onChange}
                                value={content}
                                name="content"
                                required="true"
                                style={{width: 600, marginTop: '10px'}}
                            />
                        </Grid>
                        <Grid>
                            <TextField
                                id="filled-helperText"
                                label="Link"
                                placeholder="https://image-you-want-to-add.com"
                                helperText="Add your images URL here"
                                variant="outlined"
                                onChange={this.onChange}
                                value={image}
                                name="image"
                                style={{width: 600, marginTop: '10px'}}
                            />
                        </Grid>
                        <AddTag id={postId} addTag={this.addTag} setTag={this.getTags}/>
                        <Divider/>
                        {/*{this.state.tags > 0 && <TagsArray tags={this.getTags} postId={postId}/>}*/}
                        {this.state.tags ? ((this.state.tags.length > 0) && <TagsArray tags={this.state.tags} postId={postId} handleDelete={this.handleDelete}/>) : null}
                        <Divider/>
                        <Sections/>

                        <Grid container justify="flex-end" style={{marginTop: '10px'}}>
                            <Button
                                variant="outlined"
                                type="submit"
                                onClick={this.onSubmit}
                            >
                                Save post
                            </Button>
                        </Grid>
                        {errorAlert ? <Alert severity="error" style={{marginTop: '10px'}}>Something went wrong...</Alert> : null}
                    </form>
                </div>
            </Grid>
        )
    }
}

export default NewPost;
