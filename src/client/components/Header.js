import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'


class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header>
                <ul className="nav-bar">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
                <li>{this.props.isLoggedIn ? <Link to="/" onClick={this.props.onLogout}>Hi, {this.props.user} Logout</Link> : <Link to="/login" onClick={this.props.setLogin}>Login</Link>}</li>
            </header>
        );
    }
}

export default Header;