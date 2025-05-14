import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const colors = ['Blue', 'Green', 'Red', 'Purple'];

const StartPage = () => {
  const [selectedColor, setSelectedColor] = useState('Blue');
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem('selectedColor', selectedColor.toLowerCase());
    navigate('/login');
  };

  const handleRegistration = () => {
    localStorage.setItem('selectedColor', selectedColor.toLowerCase());
    navigate('/registration');
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
        
    <div className='login-btns'>
      <button className="login-btn" onClick={handleLogin}>
        Have an account? Go to login
      </button>

      <button className="login-btn" onClick={handleRegistration}>
        Register new account
      </button>
    </div>
  </div>
  );
};

export default StartPage;

