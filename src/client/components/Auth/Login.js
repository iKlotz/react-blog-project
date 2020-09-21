import React from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import {Grid, TextField, Button, InputAdornment} from "@material-ui/core";
import {LockRounded, Email} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import GoogleLogin from "react-google-login";

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
        const url = `/users/${data.profileObj.email}`;
        console.log(url);
        axios.get(`/users/${data.profileObj.email}`)
            .then(res => {
                this.props.setLogin(res.data)
            })
            .catch((err) => {
                console.log(err);
                console.log("Error during google login");
            });
    };


    render() {
        if (this.props.isLoggedIn) {
            return (<Redirect to="/"/>)
        }

        const {email, password} = this.state;

        return (
            <div>
                <Grid container justify="center" style={{minHeight: '80vh'}}>
                    <Grid
                        container
                        item xs={12}
                        sm={6}
                        alignItems='center'
                        direction="column"
                        justify="center"
                        style={{padding: 2}}
                    >
                        <div/>
                        <div style={{display: 'flex', flexDirection: 'column', maxWidth: 400, minWidth: 300}}>
                            <Grid container justify="center">
                                <Typography>
                                    <h1 width={200}>Account Login</h1>
                                </Typography>
                            </Grid>
                            <TextField
                                label="email"
                                margin='normal'
                                name="email"
                                value={email}
                                onChange={this.onChange}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><Email/></InputAdornment>
                                }}
                            />
                            <TextField
                                type="password"
                                label="password"
                                margin='normal'
                                name="password"
                                value={password}
                                onChange={this.onChange}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><LockRounded/></InputAdornment>
                                }}
                            />
                            <Button
                                style={{marginBottom: '5px'}}
                                color="primary"
                                variant="contained"
                                type="submit"
                                onClick={e => this.onSubmit(e)}>
                                Log in
                            </Button>
                            {/*<Grid container justify="center">*/}
                                <GoogleLogin
                                    clientId="354081205543-jabqkm7h9ugpus91nkblj9nhto02pc4m.apps.googleusercontent.com"
                                    buttonText="Login with Google"
                                    onSuccess={this.onGoogleResponse}
                                    onFailure={this.onGoogleResponse}
                                    cookiePolicy={'single_host_origin'}
                                />
                            {/*</Grid>*/}
                            <Button>
                                <Link to="/register">
                                    Not a member yet?
                                </Link>
                            </Button>
                        </div>
                        {/*<Grid container justify="center" spacing={2}>*/}
                        {/*    <Grid item>*/}
                        {/*        <Button variant="outlined">*/}
                        {/*            Forgot password?*/}
                        {/*        </Button>*/}
                        {/*    </Grid>*/}
                        {/*    <Grid item>*/}
                        {/*        <Button color="primary" disabled>*/}
                        {/*            Go to hell*/}
                        {/*        </Button>*/}
                        {/*    </Grid>*/}
                        {/*</Grid>*/}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Login;