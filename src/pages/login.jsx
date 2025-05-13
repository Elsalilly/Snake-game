import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


function Login() {
    const users = JSON.parse(localStorage.getItem('user'));

    const [loginUsername, setLoginUsername] = useState("");
    const [loginUserPassword, setLoginUserPassword] = useState("");
    const [verified, setVerified] = useState(false);

    const verifyUser = () => {
        //filters the users array from local storage. If there is a match, 
        // the will be an object in the array result and length.result will be (at least) 1
        let result = users.filter(({username,userPassword}) => [loginUserPassword].includes(userPassword) && username == loginUsername);
        console.log(result);
        
        if (result.length > 0) {
            setVerified(true);
        } else {
            setVerified(false);
        }; 
        console.log(verified);

        //clears the input fields
        setLoginUsername("");
        setLoginUserPassword("");
    };

    return (
        <div>
            <h2>Log in to your account for access to lots of fun games!</h2>
            <input type="text" minLength={1} value={loginUsername} placeholder="your username" 
            onChange={(e) => setLoginUsername(e.target.value)}/>
            <input type="text" minLength={1} value={loginUserPassword} placeholder="your password" 
            onChange={(e) => setLoginUserPassword(e.target.value)}/>
            <button onClick={verifyUser}>Log In</button>
            
            {verified && (
                <div>
                    <button><Link to='/simplefun'>Simple Fun!</Link></button>
                </div>
            )}
            {!verified && (
                <h3>Wrong username and/or password</h3>
            )}
        </div>
    );
};

export default Login;