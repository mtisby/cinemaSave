import { ReactSession } from 'react-client-session';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import movieFunctions from "../api/index.js";

function Profile() {
  let userid = ReactSession.get("userid") 
  const [pins, setPins] = useState([]);
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    movieFunctions
      .getProfile(userid)
      .then((response) => {
        console.log('promise fulfilled')
        return response.data
      })
      .then((response) => {
        console.log(response.pins)

        setPins(response.pins)
        setBoards(response.boards)
      })
  }, []);

  console.log('pins', typeof pins, pins)
  console.log('boards', boards)

  const allPins = pins.map((i) => {
    return (
      <div>
        <p>{ i.title }</p>
      </div>)
  });

    return (
        <div className="profile">
          <Link to="/home">home</Link>
          <h1>Welcome {ReactSession.get("username")}</h1>
          { allPins }
        </div>
      );
}
  
export default Profile;
  
