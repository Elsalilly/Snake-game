import Snake from "../components/snake";
import Food from "../components/food";
import Buttons from "../components/buttons";

import "../styles/game.css";

import React, { useState } from "react";

//Random food coordinates 
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
    speed: 400,
}

const Game = () => {
const [snakeDots, setSnakeDots] = useState(initialState.snakeDots);
const [food, setFood] = useState(initialState.food);
const [speed, setSpeed] = useState(initialState.speed);

    return (
       <div className="game-area">
        <Snake snakeDots={snakeDots} />
       </div>
    );
}

export default Game;