import React from 'react';
import Login from "../components/Auth/Login";


function LoginPage(props) {
    return (
        <div>
            <Login {...props}/>
        </div>
    );
}

export default LoginPage;