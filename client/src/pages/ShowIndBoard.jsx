import { ReactSession } from 'react-client-session';
import React, { useEffect, useState } from 'react';
import movieFunctions from "../api/index.js";
import { Link } from 'react-router-dom';
// style sheets
import './profile.css';

function ShowIndBoard() {
    const userid = ReactSession.get("userid") ;
    const [board, setBoard] = useState([]);
    const [boardID, setBoardID] = useState('');
    const [pins, setPins] = useState([]);

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
      

    // fetch('http://localhost:3060/authentication/profile/getboard/', {
    //     method: 'POST',
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ 'user_id':userid })
    // }).then((response) => {
    //     setBoardID(window.location.pathname.split('/board/')[1])
    //     return response.json()
    // }).then((response) => {
    //     try {
    //         Object.keys(response).map(function (key) {
    //             if (response[key]._id === boardID) {
    //                 setBoard(response[key])
    //                 setPins(response[key].pins)
    //             }
    //         })
    //     } catch (error) { 
    //         console.log(error)
    //     }
    // })


    const [movie, setMovies] = useState([]);

    useEffect(() => {
        movieFunctions
        .getAll()
        .then((response) => {
            setMovies(response.data)
        })
    }, []);


    useEffect(() => {
        movieFunctions
        .getProfileBoards()
        .then((response) => {
            console.log(response)
            // try {
            //     Object.keys(response).map(function (key) {
            //         if (response[key]._id === boardID) {
            //             setBoard(response[key])
            //             setPins(response[key].pins)
            //         }
            //     })
            // } catch (error) { 
            //     console.log(error)
            // }
        })
    }, []);


    
    const allPins = Object.keys(movie).map(function (key) { 
        return (
       <div className='movie-contianer-profile'>
           <img src={movie[key].poster} alt={ `${movie[key].title} poster`} className='poster'/>
            <div className='movie-descrip'>
                <h3>{movie[key].title}</h3>
                <h5>imdb: { movie[key].imdbRating } </h5>
                <h5>genre(s): { movie[key].genre } </h5>
            </div>
            <button className='save-btn' onClick={() => handleButtonClick({ 'movieID': movie[key]._id, 'userID': userid, 'boardID': boardID })}>save</button>
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
              <Pins pins={pins} />
              <div className='movies-contianer'>
                  { allPins }
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
                    <p>mapping pins</p>
                </div>
            )
        }
    }

}

export default ShowIndBoard;