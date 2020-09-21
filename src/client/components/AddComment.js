import React from 'react';
import axios from 'axios';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
    root: {
        width: "100%",
        backgroundColor: theme.palette.background.paper
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },

    button: {
        margin: theme.spacing(0, 0, 2),
        justifyContent: "space-between"
    },

    text: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        minWidth: 600
    }
});

class AddComment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            content: undefined,
        };
    }

    onContentChange = (e) => {
        this.setState({
            content: e.target.value,
        })
    };

    onSubmit = (e) => {
        e.preventDefault();
        const data = {
            //title: this.state.title,
            content: this.state.content,
            post_id: this.props.id,
            author_id: this.props.authorId
        };

        let id = this.props.id;
        console.log(id);

        axios.post(`/posts/${id}/comments`, data).then(res => {
            const comment = res.data;
            this.setState({
                title: '',
                content: ''
            });
        });

        //should be a better way
        window.location.reload(false);
    };

    render() {

        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <form className={classes.root} noValidate autoComplete="off">
                    <Grid ixs={12} sm={6}>
                        <TextField className={classes.text}
                                   id="standard-basic"
                                   label="Add public comment"
                                   onChange={this.onContentChange}
                                   value={this.state.content}
                        />
                    </Grid>
                    <Grid container justify="flex-end">
                        <Button className={classes.button}
                                type="submit"
                                variant="text"
                                onClick={this.onSubmit}
                        >Add comment
                        </Button>
                    </Grid>
                </form>
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(AddComment);
