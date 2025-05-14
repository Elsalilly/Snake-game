import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/registration.css";

function Registration() {
    
    const [newUsername, setNewUsername] = useState("");
    const [newUserPassword, setNewUserPassword] = useState("");
    const [userList, setUserList] = useState([]);

    localStorage.setItem("user", JSON.stringify(userList));

    const addUser = () => {
        
        const newUser = {
            username: newUsername,
            userPassword: newUserPassword,
        };

        setUserList(l => ([...l ,newUser]));
        
        console.log(newUser);
        localStorage.setItem("user", JSON.stringify(userList));
        setNewUsername("");
        setNewUserPassword("");

    };

    return (
        <div className="start-container">
            <h2>Register for access to Snake Game!</h2>
            <p>First you have to register an account, then you can log in and play.</p>
            
            <input type="text" minLength={1} value={newUsername} placeholder="Choose your username" 
            onChange={(e) => setNewUsername(e.target.value)}/>
            <br />
            <input type="text" minLength={1} value={newUserPassword} placeholder="Choose your password" 
            onChange={(e) => setNewUserPassword(e.target.value)}/>
            <br />
            <button className="login-btn" onClick={addUser}>Register Account</button>
            <br />
            <p>If you already have an account, go directly to log in. </p>
            <button className="login-btn"><Link to='/login'>Log In</Link></button>
        </div>
    );
};

export default Registration;
