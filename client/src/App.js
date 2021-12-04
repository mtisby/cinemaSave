import './App.css';
import React, { useEffect, useState } from 'react'
import movieFunctions from "./api/index.js"

import { Movies } from './components/Movies';

function App() {
  const [movie, setMovies] = useState([]);

  useEffect(() => {
    movieFunctions
      .getAll()
      .then((response) => {
        console.log('promise fulfilled')
        setMovies(response.data)
      })
      .then((response) => {
        console.log(movie[0])
      })
  }, []);

  const movies = movie.map((i) => {return ( <h1>{i.title}</h1> )});
  return (
    <div className="App">
      <Movies />
      <a href="/profile">link to profile</a>
      <a href="/register">register</a>
      {movies}
    </div>
  );
}

export default App;
