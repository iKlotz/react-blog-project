import React from 'react';
import Header from "./client/components/Header"
import {BrowserRouter as Router, Redirect, Route, Switch, useParams} from "react-router-dom";
import HomePage from "./client/pages/HomePage";
import About from "./client/pages/About";
import ContactMe from "./client/pages/ContactMe";
import PostPage from "./client/pages/PostPage";
import CreatePostPage from "./client/pages/CreatePostPage";
import SearchPage from "./client/pages/SearchPage";
import Login from "./client/components/Auth/Login";
import Register from "./client/components/Auth/Register";
import './App.css';
import axios from "axios";
import EditPostPage from "./client/pages/EditPostPage";
import SearchByTagPage from "./client/pages/SearchByTagPage";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: cookies.get('first_name'),
            userId: cookies.get('user_id'),
            isLoggedIn: cookies.get('session_id') !== undefined,
            session_id: cookies.get('session_id'),
            sections: [
                {title: 'Technology', url: '#'},
                {title: 'Design', url: '#'},
                {title: 'Culture', url: '#'},
                {title: 'Business', url: '#'},
                {title: 'Politics', url: '#'},
                {title: 'Opinion', url: '#'},
                {title: 'Science', url: '#'},
                {title: 'Health', url: '#'},
                {title: 'Style', url: '#'},
                {title: 'Travel', url: '#'},
            ]
        }
    }

    setLogin = (data) => {
        this.setState({
            firstName: data.first_name,
            userId: data.user_id, //need to get one
            session_id: cookies.get('session_id'),
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
        const {firstName, isLoggedIn, userId, sections} = this.state;
        return (
            <div>
                <Router>
                    <Header user={firstName} isLoggedIn={isLoggedIn} userId={userId} onLogout={this.onLogout}
                            sections={sections}/>
                    <Switch>
                        <Route path='/register' component={() => <Register isLoggedIn={this.state.isLoggedIn}
                                                                           setLogin={this.setLogin}/>}/>
                        <Route path='/login'
                               component={() => <Login isLoggedIn={this.state.isLoggedIn} setLogin={this.setLogin}/>}/>
                        <Route path='/post/:id'
                               component={(props) => <PostPage {...props} user={firstName} userId={userId}/>}/>
                        <Route path="/about" component={About}/>
                        <Route path='/search/tag/:query' component={(props) => <SearchByTagPage {...props} />}/>
                        <Route path='/search/:query' component={(props) => <SearchPage {...props} />}/>
                        <Route path="/contact" component={ContactMe}/>
                        <Route path="/new-post" component={(props) => <CreatePostPage {...props} />}/>
                        <Route path="/edit-post/:id" component={(props) => <EditPostPage {...props} />}/>
                        <Route path="/" component={HomePage}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
