import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/registration.css";

function Registration() {
    
    const [newUsername, setNewUsername] = useState("");
    const [newUserPassword, setNewUserPassword] = useState("");
    const [attemptedRegistration, setAttemptedRegistration] = useState(false);
    const [registrationVerified, setRegistrationVerified] = useState(false);
    // not needed const [userList, setUserList] = useState([]);

    const navigate = useNavigate(); //Initalize navigate

    // localStorage.setItem("user", JSON.stringify(userList));
    // Tar bort denna rad eftersom den försöker spara användarlistan innan den ens fyllts 
    // med några användare. (Detta resulterade i att gamla användare skrevs över av en tom lista).

    const addUser = () => {
        //Check for empty inputs
        if(!newUsername.trim() || !newUserPassword.trim()) {
            setAttemptedRegistration(true);
            setRegistrationVerified(false); 
            return;
        }

        // Hämtar den senaste användarlistan från localStorage (den är tom om det inte finns registrerade användare än)
        const existingUsers = JSON.parse(localStorage.getItem("user")) || []; 


        const usernameExists = existingUsers.some(
            (user) => user.username === newUsername.trim()
        );

        if (usernameExists) {
            setAttemptedRegistration(true);
            setRegistrationVerified(false); 
            return;
        }

        const newUser = {
            username: newUsername.trim(),
            userPassword: newUserPassword.trim(),
        };

        // Lägger in nya användaren till den befintliga listan.
        const updatedUsers = [...existingUsers, newUser];

       // setUserList(updatedUsers); // Uppdaterar userList *ändrat från (l => ([...l ,newUser])) till (updatedUsers)*
        
        // console.log(newUser);
        localStorage.setItem("user", JSON.stringify(updatedUsers)); // Ändrat från userList till updatedUsers här så att den uppdaterade användarlistan är i localStorage
        setNewUsername("");
        setNewUserPassword("");
        setAttemptedRegistration(true);
        setRegistrationVerified(true); //Registration success
        
        navigate("/login"); //Redirect to login
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
            {attemptedRegistration && !registrationVerified && (
                <h3>Username already exist or fields are empty</h3>
            )}
            <p>If you already have an account, go directly to log in. </p>
            <button className="login-btn"><Link to='/login' className="link-text">Log In</Link></button>
        </div>
    );
};

export default Registration;
