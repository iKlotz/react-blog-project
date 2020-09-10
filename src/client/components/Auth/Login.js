import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {Grid, TextField, Button, InputAdornment} from "@material-ui/core";
import {LockRounded, Email} from "@material-ui/icons";

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


    render() {
        if (this.props.isLoggedIn) {
            return (<Redirect to="/"/>)
        }


        const {email, password} = this.state;
        return (
            <div>
                <Grid container style={{minHeight: '100vh'}}>
                    <Grid item xs={12} sm={6}>
                        <img
                            src="https://render.fineartamerica.com/images/rendered/default/poster/8/10/break/images-medium-5/a-brooklyn-perspective-az-jackson.jpg"
                            style={{width: '100%', height: '100%', objectFit: 'cover'}} alt="cover"/>
                    </Grid>
                    <Grid
                        container
                        item xs={12}
                        sm={6}
                        alignItems='center'
                        direction="column"
                        justify="space-between"
                        style={{padding: 10}}
                    >
                        <div/>
                        <div style={{display: 'flex', flexDirection: 'column', maxWidth: 400, minWidth: 300}}>
                            <Grid container justify="center">
                                <h1 width={200}>Account Login</h1>
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
                                {/*<div style={{height: 20}}/>*/}
                                <Button
                                    color="primary"
                                    variant="contained"
                                    type="submit"
                                    onClick={e => this.onSubmit(e)}>
                                    Log in
                                </Button>
                            <Button>Not a member yet?</Button>
                        </div>
                        <Grid container justify="center" spacing={2}>
                            <Grid item>
                                <Button color="primary">
                                    Go to hell
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined">
                                    Forgot password?
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>


        );
    }
}

export default Login;