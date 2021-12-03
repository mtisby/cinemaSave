import './App.css';
import React, { useEffect, useState } from 'react'

import { Movies } from './components/Movies';

function App() {
  const [movie, setMovies] = useState({});

  useEffect(() => {
    fetch("http://localhost:3060/")
      .then((response) => response.json())
      .then((responseJson) => {
        setMovies(responseJson)
      });
  }, []);

  return (
    <div className="App">
      <Movies />
      <h1>movie</h1>
    </div>
  );
}

export default App;
