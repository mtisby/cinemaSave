import React, { useEffect, useState } from 'react'
// import { Navigate } from 'react-router-dom';
import { Route, Link } from 'react-router-dom';
import movieFunctions from "../api/index.js"
import { MovieSM } from '../components/MovieSM';

// style sheets
import '../pages/home.css';

export const PinReccomendations = (props) => {
    const handleMovieID = (props) => {
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
        <Route to={`/movie/:${id}`} component={MovieSM} />
        }
    })
    }
      
    const handleButtonClick = (props) => {
          
        fetch('http://localhost:3060/authentication/profile/addpin/', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(props)
        }).then((response) => {
          let req = response.json()
          return req
        })
      }

    const userid = props.userid;
    const [movie, setMovies] = useState([]);
  
    useEffect(() => {
      movieFunctions
        .getAll(userid)
        .then((response) => {
          console.log('promise fulfilled')
          console.log(response)
          setMovies(response.data)
        })
    }, []);

    const movies = movie.map((i) => {
        return (
            <div className='movie-container'>
                <Link to={`/movie/${i._id}`} onClick={() => handleMovieID(i._id)} style={{ textDecoration: 'none', color:'black'}}><img src={i.poster} alt={ `${i.title} poster`} className='poster'/></Link>
                <div className='movie-descrip'>
                    <h3>{i.title}</h3>
                    <h5>imdb: { i.imdbRating } </h5>
                    <h5>genre(s): { i.genre } </h5>
                </div>
                <div className='save-btn-container'><button className='save-btn' onClick={() => handleButtonClick({ 'movieID': i._id, 'userID': userid })}></button></div>
            </div>)
    });
    
    return (
        <div className='movies-contianer'>
            { movies }
        </div>
    )
}
