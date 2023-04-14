import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {

  const [count, setCount] = useState(parseInt(localStorage.getItem('clicks')) || 0);
  const [clickLocations, setClickLocations] = useState([]);

  const handleClick = (event) => {
    const newCount = count + 1;
    setCount(newCount);
    navigator.geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setClickLocations(prevClickLocations => [
          ...prevClickLocations,
          {lat: lat, lng: lng, count: newCount}
        ]);
      },
      error => {
        console.log(error);
      }
    );
    localStorage.setItem('clicks', newCount);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const clicks = parseInt(localStorage.getItem('clicks')) || 0;
        setClickLocations(prevClickLocations => [
          ...prevClickLocations,
          {lat: lat, lng: lng, count: clicks}
        ]);
      },
      error => {
        console.log(error);
      }
    );
  }, []);

  return (
      <div>
        <p>Click Here to Increment the click count!</p>
        <h1>Click Count: {count}</h1>
        <table>
          <thead>
            <tr>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Click Count</th>
            </tr>
          </thead>
          <tbody>
            {clickLocations.map((location, index) => (
              <tr key={index}>
                <td>{location.lat}</td>
                <td>{location.lng}</td>
                <td>{location.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleClick}>Click ME</button>
      </div>
  );
}

export default App;
