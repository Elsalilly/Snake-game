//Components
import Snake from "../components/snake";
import Food from "../components/food";
import HighScore from "../components/Highscore.jsx";

//API
import { playSound } from "../utils/sound.js";

// CSS
import "../styles/game.css";
import "../App.css";

//React and useState
import React, { useEffect, useState, useRef } from "react";

//Random food coordinates so it's within game grid 
const getRandomCoordinates = () => {
    let min = 1;
    let max = 98;
    let x = Math.floor((Math.random() * (max - min +1) + min) / 2) * 2;
    let y = Math.floor((Math.random() * (max - min +1) + min) / 2) * 2;
    return [x, y];
}

//Initial of the game (starting: position, food, direction and speed)
const initialState = {
    snakeDots: [[0, 0], [2,0]],
    food: getRandomCoordinates(),
    direction: "RIGHT",
    speed: 200,
}

const Game = () => {
    const snakeColor = localStorage.getItem('selectedColor') || 'blue';
    const [snakeDots, setSnakeDots] = useState(initialState.snakeDots); //State to track snake's position
    const [food, setFood] = useState(initialState.food); //State to track food location 
    const [speed, setSpeed] = useState(initialState.speed); //State to track snake speed
    const [direction, setDirection] = useState(initialState.direction); // State to track direction
    const [speedLevel, setSpeedLevel] = useState(0);
    const [showHighScore, setShowHighScore] = useState(false);
    const gameOverSoundRef = useRef(false);

    let gameOverSound = false;

    //Handles keyboard input, snake direction
    useEffect(() => {
        onkeydown = (e) => {
            switch (e.key) {
                case "ArrowUp":
                    setDirection("UP");
                    break;
                case "ArrowDown":
                    setDirection("DOWN");
                    break;
                case "ArrowLeft":
                    setDirection("LEFT");
                    break;
                case "ArrowRight":
                    setDirection("RIGHT");
                    break;
                default:
                    break;
        }
    };
    
    document.addEventListener("keydown", onkeydown); //Event listener for keyboard input
    const gameInterval = setInterval(moveSnake, speed);

    return () => {
        clearInterval(gameInterval);
        document.removeEventListener("keydown", onkeydown);
    };
}, [snakeDots, direction, speed]);

    const moveSnake = () => {
        let dots = [...snakeDots];
        let head = dots[dots.length -1];

        switch (direction) {
            case "UP":
                head = [head[0], head[1] - 2];
                break;
            case "DOWN":
                head = [head[0], head[1] + 2];
                break;
            case "LEFT":
                head = [head[0] - 2, head[1]];
                break;
            case "RIGHT":
                head = [head[0] + 2, head[1]];
                break;
            default:
                break;
        }

        if (checkCollision(head, dots)) {
            gameOver();
            return;
        };

        dots.push(head);

        const checkIfEaten = head[0] === food[0] && head[1] === food[1];

        // Check for food collision
        if (!checkIfEaten) {
            dots.shift();
        } else {
            setFood(getRandomCoordinates());
            playSound(705735); //Coin sound
        }
        // After every 5 eaten speed will increase (first will increase at 3 as length starts at 2)
        if (dots.length % 5 === 0 && dots.length !== speedLevel && speed >40 ) {
            setSpeed(prevSpeed => prevSpeed - 20);
            setSpeedLevel(dots.length);
        }

        setSnakeDots(dots);

    };
    // Collison with both self and wall
    const checkCollision = (head, body) => {
        const [x, y] = head; //destrucure the head array
        const hitWall = x >= 100 || y >= 100 || x < 0 || y < 0; //checks if head outside game area
        const hitSelf = body.some(dot => dot[0] === x && dot[1] === y);
    
        return hitWall || hitSelf;
    };

  
    const gameOver = () => {
        // --------------- Save score to localStorage
        const score = snakeDots.length - 2;
        const activeUser = JSON.parse(localStorage.getItem("activeUser"));
        const username = activeUser?.username;

        if (!gameOverSoundRef.current) {
            playSound(159408);
            gameOverSoundRef.current = true;
        }
        
        if (score > 0) {
            const storedScores = JSON.parse(localStorage.getItem("userScores")) || [];
            const updatedScores = [...storedScores, { username, score }];
            localStorage.setItem("userScores", JSON.stringify(updatedScores));
        }
        // --------------- Save score to localStorage
        setShowHighScore(true);
    };

    const resetGame = () => { //Reboot
        setSnakeDots(initialState.snakeDots);
        setFood(getRandomCoordinates);
        setDirection(initialState.direction);
        setSpeed(initialState.speed);
        setShowHighScore(false);
        gameOverSoundRef.current = false;
    };
   

    let content;
    if (showHighScore) {
        content = (
            <>
                <HighScore />
                <button className="play-btn" onClick={resetGame}>Play again</button>
            </>
        );
    }
    else {
        content = (
            <>
                <div className="game-wrapper">
                    <h1 className="score-title">Score: {snakeDots.length - 2}</h1>
                    <div className="game-area">
                        <Snake snakeDots={snakeDots} snakeColor={snakeColor} />
                        <Food dot={food} />
                    </div>
                </div>
            </>
        );
    }

    return (
            <div>
            {content} 
            </div>
    );
}

export default Game;