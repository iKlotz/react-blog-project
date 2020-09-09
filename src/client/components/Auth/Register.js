import React from 'react';
import axios from "axios";

class Register extends React.Component {
    constructor(props) {
        super(props);
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

        const url = "/register"
        const data = {
            email: email,
            password: password,
            first_name: firstName,
            last_name: lastName
        };

        axios.post(url, data)
            .then( res => {
                this.setState({
                    firstName: '',
                    lastName: '',
                    email:'',
                    password: '',
                    serverResponse: "Great success"
                });
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
        const {firstName, lastName, email, password} = this.state;
        return (
            <div className='form-container'>
                <h1>
                    Account Register
                </h1>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label htmlFor="firstName">First Name:</label>
                        <input type="text" name="firstName" value={firstName} onChange={this.onChange} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name:</label>
                        <input type="text" name="lastName" value={lastName} onChange={this.onChange} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email Address:</label>
                        <input type="email" name="email" value={email} onChange={this.onChange} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={this.onChange}
                            required
                            minLength="6"
                        />
                    </div>
                    {/*<div className="form-group">*/}
                    {/*    <label htmlFor="password2">Confirm Password:</label>*/}
                    {/*    <input type="password"*/}
                    {/*           name="password2"*/}
                    {/*           value={this.password2}*/}
                    {/*           onChange={this.onChange}*/}
                    {/*           required*/}
                    {/*           minLength="6"*/}
                    {/*    />*/}
                    {/*</div>*/}
                    <input type="submit" value="Register" className="btn btn-secondary btn-block"/>
                </form>
            </div>
        );
    };
}

export default Register;