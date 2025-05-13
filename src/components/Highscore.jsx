import React, { useEffect, useState } from "react";
import "../styles/highscore.css";

const HighScore = () => {
    const [highScores, setHighScores] = useState([]);

    useEffect(() => {
  
        // Hämta poäng från localStorage – ska ändra så att key "userScores" matchar den som används i inloggning
        const storedScores = JSON.parse(localStorage.getItem("userScores")) || [];

        // Sortera scores
        const sortScores = storedScores.sort((a, b) => b.score - a.score);
        setHighScores(sortScores);
    }, []);

    // "username" och "score" kommer ändras för att matcha det som sparas av spelet/inloggningen
    return (
        <div className="high-scores">
            <h2 className="high-scores__header">Game Over</h2>
            <ol className="high-scores__list">
                <li className="high-scores__item">
                    <span className="high-scores__title">User</span>
                    <span className="high-scores__title">Points</span>
                </li>
                {highScores.slice(0, 5).map((entry, index) => (
                    <li key={index} className="high-scores__item">
                        <span className="high-scores__name">{index + 1}. {entry.username}</span>
                        <span className="high-scores__score">{entry.score} points</span>
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default HighScore;