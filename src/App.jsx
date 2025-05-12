import React, { useState } from 'react';
import StartPage from './components/StartPage';

const App = () => {
  const [snakeColor, setSnakeColor] = useState(null);
  const handleStart = setSnakeColor;

  return (
    <div>
      {snakeColor ? (
        <div></div>
      ) : (
        <StartPage onStart={handleStart} />
      )}
    </div>
  );
};

export default App;
