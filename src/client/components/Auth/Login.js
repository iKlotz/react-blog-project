import React from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import {Grid, TextField, Button} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import GoogleLogin from "react-google-login";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import {withStyles} from "@material-ui/core/styles";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                idoklotz.com
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const styles = theme => ({
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    googleSubmit: {
        margin: theme.spacing(0, 0, 2),
        width: '100%',
    },
});


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.setState({
            email: null,
            password: null,
            serverResponse: null
        });
    }

    onChange = e => this.setState({...this.state, [e.target.name]: e.target.value});

    onSubmit = e => {
        e.preventDefault();
        const {email, password} = this.state;
        const url = "/login";
        const data = {
            email,
            password
        };

        axios.post(url, data)
            .then((res) => {
                this.setState({
                    email: '',
                    password: ''
                });

                console.log("Great success!");
                this.props.setLogin(res.data)

            })
            .catch((err) => {
                console.log("Error during login");
                this.setState({
                    serverResponse: "Error: failed to login."
                });
            });
    };

    onGoogleResponse = (data) => {
        const url = `/google-login/${data.profileObj.email}`;
        console.log(data.profileObj);
        axios.get(url)
            .then(res => {
                this.props.setLogin(res.data)
            })
            .catch((err) => {
                console.log(err);
                console.log("Error during google login");
            });
    };


    render() {
        const {classes} = this.props;

        if (this.props.isLoggedIn) {
            return (<Redirect to="/"/>)
        }

        const {email, password} = this.state;

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            value={email}
                            onChange={this.onChange}
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            value={password}
                            onChange={this.onChange}
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"

                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={e => this.onSubmit(e)}
                        >
                            Sign In
                        </Button>

                        <GoogleLogin
                            clientId="354081205543-jabqkm7h9ugpus91nkblj9nhto02pc4m.apps.googleusercontent.com"
                            buttonText="Sign in with Google"
                            onSuccess={this.onGoogleResponse}
                            onFailure={this.onGoogleResponse}
                            cookiePolicy={'single_host_origin'}
                            fullWidth
                            className={classes.googleSubmit}
                        />
                        <Grid container>
                            <Grid item container justify="flex-end">
                                <Link to="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright/>
                </Box>
            </Container>
        );
    }
}

export default withStyles(styles, {withTheme: true})(Login);