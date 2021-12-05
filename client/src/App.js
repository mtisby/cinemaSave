import './App.css';
import React, { useEffect, useState } from 'react'
// import { Navigate } from 'react-router-dom';
import { Route } from 'react-router-dom';
import movieFunctions from "./api/index.js"
import { MovieSM } from './components/MovieSM';

const handleClick = (props) => {
  const id = props;

    
    fetch('http://localhost:3060/movie/id', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id })
      }).then((response) => {
        let req = response.json()
        return req
      }).then((req) => {
        if (req !== undefined) {
          <Route to={`/movie/:${id}`} component={ MovieSM }/>
        }
      })
  }


function App() {
  const [movie, setMovies] = useState([]);
  const [movieid, setMovieID] = useState([]);
  const [userid, setUserID] = useState('');

  useEffect(() => {
    movieFunctions
      .getAll()
      .then((response) => {
        console.log('promise fulfilled')
        console.log(response)
        setMovies(response.data)
      })
      .then((response) => {
        console.log(movie[0])
      })
  }, []);

  const movies = movie.map((i) => {
    return (<a onClick={() => handleClick(i._id)} href={`/movie/${i._id}`}>
    <h1>{i.title}</h1> 
    </a>)
  });
  
  return (
    <div className="App">
      {/* <a href="/profile">link to profile</a> */}
      <br/>
      <a href="/register">register</a>
      <br/>
      <a href="/login">login</a>
      <br />
      <br/>
      {movies}
    </div>
  );
}

export default App;
