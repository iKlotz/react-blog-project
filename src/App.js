import React from 'react';
import Header from "./client/components/Header"

import { BrowserRouter as Router, Redirect, Route, Switch, useParams } from "react-router-dom";
import Home from "./client/pages/Home";
import About from "./client/pages/About";
import ContactMe from "./client/pages/ContactMe";
import Post from "./client/pages/Post";
import CreatePost from "./client/pages/CreatePost";
import Login from "./client/components/Auth/Login";
import Register from "./client/components/Auth/Register";

import './App.css';
import axios from "axios";


class App extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            firstName: '',
            userId: '',
            isLoggedIn: false
        }
    }

    setLogin = (data) => {
        this.setState({
            firstName: data.first_name,
            userId: data.user_id, //where are you???
            isLoggedIn: true
        })
    };

    onLogout = () => {
        const url = "/logout";
        const data = {
            user_id: this.state.userId
        };

        axios.post(url, data)
            .then((res) => {
                this.setState({
                    firstName: '',
                    userId: '',
                    isLoggedIn: false
                });
            })
            .catch((err) => {
                console.log("Error during logout")
            });
    };

    render() {
        const {firstName, isLoggedIn, userId} = this.state;
        return (
            <div>
                <Router>
                    <Header user={firstName} isLoggedIn={isLoggedIn} userId={userId} onLogout={this.onLogout}/>
                    <Switch>
                        <Route path='/register' component={() => <Register isLoggedIn={this.state.isLoggedIn} setLogin={this.setLogin} />}/>
                        <Route path='/login' component={() => <Login isLoggedIn={this.state.isLoggedIn} setLogin={this.setLogin} />}/>
                        <Route path='/post/:id' component={(props) => <Post {...props} user={firstName} userId={userId} />}/>
                        <Route path="/about" component={About}/>
                        <Route path="/contact" component={ContactMe}/>
                        <Route path="/new-post" component={CreatePost}/>
                        <Route path="/" component={Home}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
