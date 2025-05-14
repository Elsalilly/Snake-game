import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";

function Login() {
    const users = JSON.parse(localStorage.getItem('user'));

    const [loginUsername, setLoginUsername] = useState("");
    const [loginUserPassword, setLoginUserPassword] = useState("");
    const [verified, setVerified] = useState(false);
    const [attemptedLogin, setAttemptedLogin] = useState(false);

    const navigate = useNavigate();

    const verifyUser = () => {
        setAttemptedLogin(true);

        // Check for empty input fields
        if(!loginUsername.trim() || !loginUserPassword.trim()) {
            setVerified(false);
            return;
        }

        //filters the users array from local storage. If there is a match, 
        // the will be an object in the array result and length.result will be (at least) 1
        let result = users.filter(({username,userPassword}) => [loginUserPassword].includes(userPassword) && username == loginUsername);
        console.log(result);
        
        if (result.length > 0) {
            setVerified(true);
            localStorage.setItem("activeUser", JSON.stringify(result[0])); // --- Add activeUser to localStorage
            navigate('/game'); // Redirect to game
        } else {
            setVerified(false);
        }; 
        console.log(verified);

        //clears the input fields
        setLoginUsername("");
        setLoginUserPassword("");
    };

    return (
        <div className="start-container">
            <h2 className="h2-login">Log in to your account for access to Snake Game!</h2>
            <input type="text" minLength={1} value={loginUsername} placeholder="Your username" 
            onChange={(e) => setLoginUsername(e.target.value)}/>
            <br />
            <input type="text" minLength={1} value={loginUserPassword} placeholder="Your password" 
            onChange={(e) => setLoginUserPassword(e.target.value)}/>
            <br />
            <button className="login-btn" onClick={verifyUser}>Log In</button>

            {verified && (
                <div>
                    <button className="login-btn"><Link to='/game' className="link-text">Let's play Snake!</Link></button>
                </div>
            )}
            {attemptedLogin && !verified && (
                <h3>Incorrect username or password. Try again</h3>
            )}
            <p>Do you have problems with logging in to your account? Go back and create a new account instead. </p>
            <button className="login-btn"><Link to='/registration' className="link-text">Register a new account</Link></button>

        </div>
    );
};

export default Login;