import React, { useEffect, useState } from 'react'
import movieFunctions from "../api/index.js"

function Profile() {
    const [genre, setGenres] = useState([]);
  
    useEffect(() => {
      movieFunctions
        .genre()
        .then((response) => {
          console.log('promise fulfilled from genre')
          setGenres(response.data)
        })
        .then((response) => {
          console.log('i am genre', genre)
        })
    }, []);
  
    return (
        <div className="profile">
          <a href="/">link to home</a>
          <h1>I am profile</h1>
        </div>
      );
}
  
export default Profile;
  
