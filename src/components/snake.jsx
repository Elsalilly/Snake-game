import React from "react";
import "../styles/game.css";

const Snake = ({ snakeDots, snakeColor }) => {
{/* Loop through each coordinate in snakeDots array -> renders a square + coordinates in %*/}
    return (
        <div>
            {snakeDots.map((dot, i) => {
                const style = {
                    left: `${dot[0]}%`, //horizontal positon
                    top: `${dot[1]}%`, //vertical position
                    backgroundColor: snakeColor, //Use the passed color
                };
            return ( 
            <div 
                className="snake"
                key={i}
                style={style}
                />
            );
            })}
        </div>
    );
};

export default Snake;