import React from 'react';
import axios from "axios";
import {Container, Button, Grid, InputAdornment, CssBaseline, TextField, Avatar, Typography} from "@material-ui/core";
import {Email, LockRounded, Person} from "@material-ui/icons";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {Redirect} from 'react-router-dom';


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.setState({
            firstName: null,
            lastName: null,
            email: null,
            password: null,
        })
    }


    onChange = e => this.setState({...this.state, [e.target.name]: e.target.value});

    onSubmit = e => {
        e.preventDefault();
        const {firstName, lastName, email, password} = this.state;

        const url = "/register";
        const data = {
            email: email,
            password: password,
            first_name: firstName,
            last_name: lastName
        };

        axios.post(url, data)
            .then(res => {
                this.setState({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    serverResponse: "Great success"
                });

                this.props.setLogin(res.data)
            })
            .catch(err => {
                this.setState({
                    serverResponse: "Error: registration failed"
                });

                console.log("Error in registration")
            });
    };

    render() {
        //todo: add password validation function
        if (this.props.isLoggedIn) {
            return (<Redirect to="/"/>)
        }

        const {firstName, lastName, email, password} = this.state;
        return (
            <Container component="main" maxWidth="xs">
                <div style={{display: 'flex', flexDirection: 'column', maxWidth: 400, minWidth: 300}}>
                    {/*<CssBaseline />*/}
                    {/*<div >*/}
                    {/*    <Avatar >*/}
                    {/*        <LockOutlinedIcon />*/}
                    {/*    </Avatar>*/}
                    {/*</div>*/}
                    <Grid container justify="center">
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                    </Grid>

                    <Grid container justify="center" spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="First Name"
                                margin='normal'
                                name="firstName"
                                value={firstName}
                                onChange={this.onChange}
                                // InputProps={{
                                //     startAdornment: <InputAdornment position="start"><Person/></InputAdornment>
                                // }}
                            />
                        </Grid>


                    <Grid item xs={12} sm={6}>
                    <TextField
                        label="Last Name"
                        margin='normal'
                        name="lastName"
                        value={lastName}
                        onChange={this.onChange}
                        // InputProps={{
                        //     startAdornment: <InputAdornment position="start"><Person/></InputAdornment>
                        // }}
                    />
                    </Grid>
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
                        color="primary"
                        variant="contained"
                        type="submit"
                        onClick={e => this.onSubmit(e)}>
                        Submit
                    </Button>
                </div>
            </Container>
        );
    };
}

export default Register;