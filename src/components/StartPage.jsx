import React, { useState } from 'react';

const colors = ['Blue', 'Orange', 'Red', 'Purple'];

const StartPage = ({ onStart }) => {
  const [selectedColor, setSelectedColor] = useState('Blue');

  const handleStart = () => {
    onStart(selectedColor.toLowerCase());
  };

  return (
    <div className="start-container">
      <h1>Let's play the snake game</h1>
      
      <div className="choose-color">
        <h3>Choose your snake color:</h3>
        <div className="color-options">
          {colors.map((color) => (
            <button
              key={color}
              type="button"
              className={`color-option-btn ${selectedColor === color ? 'selected' : ''}`}
              onClick={() => setSelectedColor(color)}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      <div className="snake-preview">
      {[...Array(7)].map((_, index) => (
      <div
      key={index}
      className="snake-segment"
      style={{ backgroundColor: selectedColor.toLowerCase() }}
    ></div>
  ))}
</div>



      <button className="login-btn" onClick={handleStart} >
        Continue to login
      </button>

    </div>
  );
};

export default StartPage;
