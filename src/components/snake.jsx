import React from "react";
import "../styles/game.css";

const Snake = ({ snakeDots }) => {
{/* Loop through each coordinate in snakeDots array -> renders a square + coordinates in %*/}
    return (
        <div>
            {snakeDots.map((dot, i) => {
                const style = {
                    left: `${dot[0]}%`, //horizontal positon
                    top: `${dot[1]}%`, //vertical position
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