import { ReactSession } from 'react-client-session';
import React, { useEffect, useState } from 'react';
import movieFunctions from "../api/index.js";
import { EditBoardPopup } from '../components/EditBoardPopup.jsx';
import { Navbar } from '../components/Navbar.jsx';
import { PinReccomendations } from '../components/PinReccomendations.jsx';

// style sheets
import './profile.css';

function ShowIndBoard() {
    const userid = ReactSession.get("userid");
    let boardID = window.location.pathname.split('/board/')[1];
    const [board, setBoard] = useState([]);
    const [pins, setPins] = useState([]);
    const [showPopup, setShowPopup] = useState(Boolean);

    const handleSave = (props) => {

        fetch('https://cinema-save.herokuapp.com/authentication/profile/addpin/', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(props)
        }).then((response) => {
            return response.json()
        }).then((response) => {
            setPins(response.pins)
        })
    }

    const handleRemove = (props) => {

        fetch('https://cinema-save.herokuapp.com/authentication/profile/deletepin/', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(props)
        })
        .then((response) => {
            response = response.json()
            return response
        }).then((data) => {
            setBoard(data.boards)
            setPins(data.pins)
        })
    }

    const handleEdit = () => { 
        setShowPopup(true)
    }

    useEffect(() => {
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
            .getAll(userid)
            .then((response) => {
                setMovies(response.data)
            })
    }, []);

    const boardPins = pins.slice(0).reverse().map(function (movie) {
        return (
       <div className='board-movies'>
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
        <Navbar />
          <div className="showBoard">
            <div className='menu'>
                <button onClick={handleEdit}>edit board</button>
                  <EditBoardPopup value={ showPopup } data={ { 'userID': userid, 'boardID': boardID } }/>  
            </div>
            
            <h1>{board.title} Board</h1>
            <h3>{board.description}</h3>
              
            <Pins pins={pins} component={ boardPins }/>

            <h2>Here are some suggestions</h2>
            <div className='movies-contianer'>
                <PinReccomendations userid= { userid }/>
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
                <div className='boards-container'>
                    {props.component}
                </div>
            )
        }
    }

}

export default ShowIndBoard;