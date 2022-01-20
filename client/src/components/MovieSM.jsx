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
    const [streamMovie, setStreamMovie] = useState([]);
    
      useEffect(() => {
        movieFunctions
          .getByID({
            'movie_id': id,
            'user_id': userid
          })
          .then((response) => {
              console.log('promise fulfilled')
              let res = response.data
              return res
          })
        .then((res) => {
            setMovie(res.movie)
            setStreamMovie(res.streamMovie)
          })
      }, []);

    const handleButtonClick = (e) => {
      fetch('https://cinema-save.herokuapp.com/authentication/profile/addpin/', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          'movie_id': id,
          'user_id': userid
        })
      }).then((response) => {
        let req = response.json()
        return req
      })
  }

  const services = streamMovie.slice(0,3).map((service)=>{
    return(
      <div className="streamLogo">
          <a href={service[0]}><img src={service[2]} alt={service[3]} /></a>
      </div>
    )
  })

  let genres = movie.genre + ''
  genres = genres.split(',')
 
  const allgenres = genres.map((i) => {
    return (
      <div className='genre'>
        { i }
      </div>)
  });

    return (
      <div className="movie-show-pg">
        <div className="movie-container-col">
          <div className="movie-container-row">
            <div className="div-left">
              <img className="poster" src={movie.poster} alt={`${movie.title} poster`} />
              <div className='save-btn-container'><button className='save-btn' onClick={() => handleButtonClick({ 'movieID': movie._id, 'userID': userid })}></button></div>
            </div>
            <div className="movie-desrip-show">
              <h1>{movie.title}</h1>
              <h3>{movie.imdbRating}</h3>
              <div className="allgenres">{allgenres}</div>
              <h4>{movie.description}</h4>
              <h5>languages: {movie.languages}</h5>
            </div>
          </div>
          <div className="streamContainerParent">
              <h5>Watch it here:</h5>
              <div className="streamContainer">
                {services}
              </div>
            </div>
        </div>
      </div>

    );
}
