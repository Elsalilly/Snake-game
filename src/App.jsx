import React, { useState } from 'react';
import StartPage from './pages/StartPage';
import Game from "./pages/game";

const App = () => {
  const [snakeColor, setSnakeColor] = useState(null);
  const handleStart = (selectedColor) => {
    setSnakeColor(selectedColor.toLowerCase()); //Normalize the color. Convert the string to lowercase for consitency
  };

  return (
    <div>
      {snakeColor ? (
        <Game snakeColor={snakeColor} /> //Renders only after a color is chosen
      ) : (
        <StartPage onStart={handleStart} />
      )}
    </div>
  );
};

export default App;