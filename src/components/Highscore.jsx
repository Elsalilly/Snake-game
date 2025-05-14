import React, { useEffect, useState } from "react";
import "../styles/highscore.css";

const HighScore = () => {
    const [highScores, setHighScores] = useState([]);

    useEffect(() => {
        const storedScores = JSON.parse(localStorage.getItem("userScores")) || [];

        // Go through all saved scores, and keep only the highest score for each user
        const bestScores = storedScores.reduce((highestScoresByUser, currentScore) => {
            if (
                !highestScoresByUser[currentScore.username] ||
                highestScoresByUser[currentScore.username].score < currentScore.score
            ) {
                // Save score as the best one for this user
                highestScoresByUser[currentScore.username] = currentScore;
            }
            return highestScoresByUser; // Return the updated object
        }, {});

        // Make object to an array (and sort it from highest to lowest score)
        const sortedBestScores = Object.values(bestScores).sort((a, b) => b.score - a.score);
        setHighScores(sortedBestScores); // Save list in the state so it can show
    }, []);

   
    return ( 
        <div className="high-scores">
            <h2 className="high-scores__header">Game Over</h2>
            <ol className="high-scores__list">
                <li className="high-scores__item">
                    <span className="high-scores__title">User</span>
                    <span className="high-scores__title">Points</span>
                </li>
                {highScores.map((entry, index) => (
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