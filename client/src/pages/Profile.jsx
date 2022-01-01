import { ReactSession } from 'react-client-session';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import movieFunctions from "../api/index.js";
import { BoardPopup } from '../components/BoardPopup.jsx';
import { BoardsProfile } from '../components/BoardsProfile';
import { Navbar } from '../components/Navbar.jsx';

// style sheets
import './profile.css';

function Profile() {
  let userid = ReactSession.get("userid")
  const [pins, setPins] = useState([]);
  const [boards, setBoards] = useState([]);
  const [popupval, setPopupVal] = useState(Boolean);

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

  const handleShareButton = () => {
    const userProfileLink = document.getElementById("userProfileLink")
    userProfileLink.select();
    navigator.clipboard.writeText(userProfileLink.value);
  }

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

  const handleAddButton = () => {
    setPopupVal(true)
  }

  console.log('pins', typeof pins, pins)
  console.log('boards', boards)

  const allPins = pins.slice(0).reverse().map((i) => {
      return (
        <div className='movie-contianer-profile'>
          <img src={i.poster} alt={`${i.title} poster`} className='poster' />
          <div className='movie-descrip'>
            <h3>{i.title}</h3>
            <h5>imdb: {i.imdbRating} </h5>
            <h5>genre(s): {i.genre} </h5>
          </div>
          <br />
          <button className='removeBtn' onClick={() => handleButtonClick({ 'movieID': i._id, 'userID': userid })}>remove</button>
        </div>)
  });

    return (
      <div className="profile pgMargin">
        <Navbar />
        <div className='header'>
          <input id="userProfileLink" value={window.location.href} type="text" hidden />
          <img className='profile-img' src="https://res.cloudinary.com/dr0ofxgkz/image/upload/v1640501510/cinema-save/theater-img_w5f8yz.jpg" alt="profile-pic" />
          <div className='share'>
            <h1>{ReactSession.get("username")}</h1>
            <img onClick={handleShareButton} src="https://res.cloudinary.com/dr0ofxgkz/image/upload/v1640736464/cinema-save/logo/share_lre6s2.png" alt="share-logo" />
          </div>
        </div>
        <div>
          <div className='boards-header'>
            <div>
              <h3>Boards</h3>
            </div>
            <div><button className='addBtn' onClick={handleAddButton} >+</button></div>
          </div>
          <BoardsProfile data={ userid } />
          <BoardPopup value={ popupval } />
        </div>
        <hr />
        <div className='all-pins-profile'>
          <h2>all pins</h2>
          <div className='movies-contianer'>
              {allPins}
          </div>
        </div>
      </div>
      );
}
  
export default Profile;
  
