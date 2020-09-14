import React from 'react';
import axios from 'axios';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";


class NewPost extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: undefined,
            content: undefined,
            author: null,
            image: undefined,
            //why undefined and why null?
        };
    }

    onChange = e => this.setState({...this.state, [e.target.name]: e.target.value});

    // onTitleChange = (e) => {
    //     this.setState({
    //         title: e.target.value,
    //     })
    // };
    // onContentChange = (e) => {
    //     this.setState({
    //         content: e.target.value,
    //     })
    // };

    onSubmit = (e) => {
        e.preventDefault();
        const data = {
            title: this.state.title,
            content: this.state.content,
            author: this.state.author,
            image: this.state.image,
        };

        axios.post('/posts', data).then(res => {
            //const post = res.data;
            this.setState({
                title: '',
                content: '',
                author: '',
                image : ''
            });
        })
    };

    render() {
        const { title, image, content, author} = this.state;
        return (
            <Grid container justify="center" style={{minHeight: '80vh'}}>
                <div style={{display: 'flex', flexDirection: 'column', maxWidth: 600, minWidth: 500, marginTop: 100}}>
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
                                style={{width: 600, marginTop: '10px'}}
                            />
                        </Grid>
                        <Grid>
                            <TextField
                                id="filled-helperText"
                                label="Link"
                                placeholder="https://image-you-want-to-add.com"
                                helperText="I like your style ;)"
                                variant="filled"
                                onChange={this.onChange}
                                value={image}
                                name="image"
                                style={{width: 600, marginTop: '10px'}}
                            />
                        </Grid>

                        <Grid container justify="flex-end">
                            <Button
                                variant="outlined"
                                type="submit"
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

export default NewPost;
