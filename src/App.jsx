import React, { useState } from 'react';
import StartPage from './components/StartPage';

const App = () => {
  const [snakeColor, setSnakeColor] = useState(null);

  const handleStart = (color) => {
    setSnakeColor(color);
  };

  return (
    <div>
      {!snakeColor ? (
        <StartPage onStart={handleStart} />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default App;
