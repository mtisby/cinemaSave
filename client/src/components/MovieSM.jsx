import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import movieFunctions from "../api/index"
import { ReactSession } from 'react-client-session';

// style sheets
import './moviesm.css';

export const MovieSM = (props) => {
    const userid = ReactSession.get("userid");
    const { id } = useParams();
    const [movie, setMovie] = useState([]);
      useEffect(() => {
        movieFunctions
          .getByID({
            'movie_id': id,
            'user_id': userid
          })
          .then((response) => {
              console.log('promise fulfilled')
              let req = response.data
              return req
          })
        .then((req) => {
            setMovie(req)
            console.log(req)
          })
      }, []);

    const handleButtonClick = (e) => {
      // fetch('http://localhost:3060/authentication/profile/deletepin/', {
      //   method: 'POST',
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(props)
      // }).then((response) => {
      //   response = response.json()
      //   return response
      // }).then((data) => { 
      //   try {
      //     setPins(data.pins)
      //     setBoards(data.boards)
      //   } catch (e) { 
      //     console.log(e)
      //   }
      // })
  }

  let genres = movie.genre + ''
  genres = genres.split(',')
 
  const allgenres= genres.map((i) => {
    return (
      <div className='genre'>
        { i }
      </div>)
  });

    return (
      <div className="movie-show-pg">
        <div className="movie-container-row">
          <div className="div-left">
            <img className="poster" src={movie.poster} alt={`${movie.title} poster`} />
            <button onClick={() => handleButtonClick({ 'movieID': movie._id, 'userID': userid })}>save</button>
          </div>
          <div className="movie-desrip-show">
            <h1>{movie.title}</h1>
            <h3>{movie.imdbRating}</h3>
            <div className="allgenres">{allgenres}</div>
            <h4>{movie.description}</h4>
            <h5>languages: {movie.languages}</h5>
        
            <h5>Watch it here: { movie.stream }</h5>
          </div>
        </div>
      </div>

    );
}
