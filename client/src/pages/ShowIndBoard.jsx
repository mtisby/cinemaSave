import { ReactSession } from 'react-client-session';
import React, { useEffect, useState } from 'react';
import movieFunctions from "../api/index.js";

function ShowIndBoard() {
    const userid = ReactSession.get("userid") ;
    const [board, setBoard] = useState([]);
    const [pins, setPins] = useState([]);

    useEffect(() => {
        movieFunctions
          .getProfileBoards(userid)
          .then((response) => {
            console.log('promise fulfilled')
            return response.data
          })
            .then((response) => {
              const boardID = window.location.pathname.split('/board/')[1]
              Object.keys(response).map(function (key) { 
                  if (response[key]._id === boardID) { 
                      setBoard(response[key])
                      setPins(response[key].pins)
                  }
              })
          })
    }, []);

    console.log(board)
  return (
    <div className="showBoard">
          <h1>{board.title} Board</h1>
          <h3>{board.description}</h3>
          <Pins pins={ pins } />
          
          
    </div>
  );
}

function Pins(props) { 
    const pins = props.pins
    {
        if (pins.length === 0) {
            return (
                <div>
                    <p>add pins to this board</p>
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