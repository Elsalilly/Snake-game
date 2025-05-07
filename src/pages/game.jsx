//Components
import Snake from "../components/snake";
import Food from "../components/food";
import Buttons from "../components/buttons";

// CSS
import "../styles/game.css";

//React and useState
import React, { useEffect, useState } from "react";

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
    const [snakeDots, setSnakeDots] = useState(initialState.snakeDots); //State to track snake's position
    const [food, setFood] = useState(initialState.food); //State to track food location 
    const [speed, setSpeed] = useState(initialState.speed); //State to track snake speed
    const [direction, setDirection] = useState(initialState.direction); // State to track direction

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
}, [snakeDots, direction]);

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
        dots.push(head);
        dots.shift();
        setSnakeDots(dots);
    };

    return (
       <div className="game-area">
        <Snake snakeDots={snakeDots} />
       </div>
    );
}

export default Game;