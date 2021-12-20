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
        try {
          setPins(response.pins)
          setBoards(response.boards)
        } catch (e) { 
          console.log(e)
        }
      })
  }, []);

  const handleButtonClick = (props) => {
    
    fetch('http://localhost:3060/authentication/profile/deletepin/', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(props)
    }).then((response) => {
      response = response.json()
      return response
    }).then((data) => { 
      try {
        setPins(data.pins)
        setBoards(data.boards)
      } catch (e) { 
        console.log(e)
      }
    })
  }

  console.log('pins', typeof pins, pins)
  console.log('boards', boards)

  const allPins = pins.slice(0).reverse().map((i) => {
    return (
      <div>
        <p>{i.title}</p>
        <img src={i.poster} alt="poster" class="poster" />
        <br />
        <button onClick={() => handleButtonClick({ 'movieID': i._id, 'userID': userid })}>remove</button>
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
  
