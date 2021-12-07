import React, { useEffect, useState } from 'react'
// import { Navigate } from 'react-router-dom';
import { Route, Link} from 'react-router-dom';
import movieFunctions from "../api/index.js"
import { MovieSM } from '../components/MovieSM';
import {ReactSession} from 'react-client-session';

// style sheets
import './home.css';

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


function Home(props) {
  const [movie, setMovies] = useState([]);
  const [movieid, setMovieID] = useState([]);

  useEffect(() => {
    movieFunctions
      .getAll()
      .then((response) => {
        console.log('promise fulfilled')
        console.log(response)
        setMovies(response.data)
      })
      .then((response) => {
      })
  }, []);

  const movies = movie.map((i) => {
    return (
      <div>
        <a onClick={() => handleClick(i._id)} href={`/movie/${i._id}`}><h1>{i.title}</h1></a>
        <img src={i.poster} alt="la" class="poster" />
        <br />
        <button>save</button>
      </div>)
  });
  let userid = ReactSession.get("userid") 

  return (
    <div className="Home">
      <Link to={`/profile/${userid}`}>Profile</Link>
      <h1>I am the Home Page</h1>
      <br />
      
      {movies}
    </div>
  );
}

export default Home;