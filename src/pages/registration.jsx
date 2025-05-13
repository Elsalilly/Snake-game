import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
        <div>
            <h2>Register for access to Ssnake Game!</h2>
            <p>OBS! Detta är inte en riktig inloggningssida, det är en övning i lokalt lagrande av data och jag kan se dina sparade data. </p>
            <p>Så, använd INTE ett lösenord som du har någon annanstans också. </p>
            
            <input type="text" minLength={1} value={newUsername} placeholder="Choose your username" 
            onChange={(e) => setNewUsername(e.target.value)}/>
            <input type="text" minLength={1} value={newUserPassword} placeholder="Choose your password" 
            onChange={(e) => setNewUserPassword(e.target.value)}/>
            <button onClick={addUser}>Register Account</button>
            <button><Link to='/login'>Log In</Link></button>
        </div>
    );
};

export default Registration;
