import { ReactSession } from 'react-client-session';
import React, { useEffect, useState } from 'react';
import movieFunctions from "../api/index.js";
import { Link } from 'react-router-dom';
// style sheets
import './profile.css';

function ShowIndBoard() {
    const userid = ReactSession.get("userid");
    let boardID = window.location.pathname.split('/board/')[1];
    const [board, setBoard] = useState([]);
    const [pins, setPins] = useState([]);

    const handleSave = (props) => {

        fetch('http://localhost:3060/authentication/profile/addpin/', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(props)
        }).then((response) => {
          let req = response.json()
          return req
        })
    }

    const handleRemove = (props) => {

        fetch('http://localhost:3060/authentication/profile/deletepin/', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(props)
        })
        //     .then((response) => {
        //     console.log("removing?")
        //     response = response.json()
        //     return response
        // }).then((data) => {
        //     try {
        //         console.log(data)
        //     } catch (e) {
        //         console.log(e)
        //     }
        // })
    }

    useEffect(() => {
        console.log(boardID)
        movieFunctions
            .getProfileBoard(userid, boardID)
            .then((response) => {
                return response.data
            })
            .then((response) => {
                setBoard(response)
                setPins(response.pins)
            })
    }, []);


    const [movie, setMovies] = useState([]);
    useEffect(() => {
        movieFunctions
            .getAll()
            .then((response) => {
                setMovies(response.data)
            })
    }, []);

    const suggestedPins = Object.keys(movie).map(function (key) {
        return (
       <div className='movie-contianer-profile'>
           <img src={movie[key].poster} alt={ `${movie[key].title} poster`} className='poster'/>
            <div className='movie-descrip'>
                <h3>{movie[key].title}</h3>
                <h5>imdb: { movie[key].imdbRating } </h5>
                <h5>genre(s): { movie[key].genre } </h5>
            </div>
            <button className='save-btn' onClick={() => handleSave({ 'movieID': movie[key]._id, 'userID': userid, 'boardID': boardID })}>save</button>
       </div>
        )
    })

    const boardPins = pins.map(function (movie) {
        console.log('movie', movie)
        return (
       <div className='movie-contianer-profile'>
           <img src={movie.poster} alt={ `${movie.title} poster`} className='poster'/>
            <div className='movie-descrip'>
                <h3>{movie.title}</h3>
                <h5>imdb: { movie.imdbRating } </h5>
                <h5>genre(s): { movie.genre } </h5>
            </div>
            <button className='save-btn' onClick={() => handleRemove({ 'movieID': movie._id, 'userID': userid, 'boardID': boardID })}>remove</button>
       </div>
        )
    })

  return (
    <div>
        <Link to="/home">Home</Link> <br />
        <Link to={`/profile/${userid}`}>Profile</Link>
        <div className="showBoard">
            <h1>{board.title} Board</h1>
            <h3>{board.description}</h3>
              <Pins pins={pins} component={ boardPins }/>
            <div className='movies-contianer'>
                { suggestedPins }
            </div>
        </div>
    </div>
  );
}


function Pins(props) {
    const pins = props.pins
    {
        if (pins.length === 0) {
            return (
                <div>
                    <p>get started by adding pins to this board!</p>
                </div>
            )
        } else {
            return (
                <div>
                    {props.component}
                </div>
            )
        }
    }

}

export default ShowIndBoard;