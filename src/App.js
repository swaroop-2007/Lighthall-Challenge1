import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {

  const [count, setCount] = useState(0);

  useEffect(() => {
    const clicks = parseInt(localStorage.getItem('clicks')) || 0;
    setCount(clicks);
  }, []);

  const handleClick = () => {
    const newCount = count +1;
    setCount(newCount);
    localStorage.setItem('clicks', newCount);
  }

  return (

      <div>

        <p> Click Here to Increment the click count!</p>

        <h1>Click Count: {count} </h1>
        <button onClick={handleClick}>Click ME</button>
      </div>
  );
}

export default App;

