import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import movieFunctions from "../api/index"

export const MovieSM = (props) => {
    const { id } = useParams();
    const [movie, setMovie] = useState([]);
      useEffect(() => {
        movieFunctions
          .getByID(id)
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

      const handleSubmit = (e) => {
        // e.preventDefault();
        // const user = { username, password };

        // fetch('http://localhost:3060/authentication/login/', {
        //     method: 'POST',
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(user)
        // }).then((response) => {
        //     console.log('logged in');
        //     let req = response.json()
        //     console.log(req)
        //     return req
        // }).then((req) => {
        //     console.log(req)
        //     if (req !== 'success') {
        //         setID(req);
        //         setLogin(true);
        //     }
        // })
    }
    return (
        <div>
          <form onSubmit={handleSubmit.bind(this)}>
            <h1>{movie.title}</h1>
            <h1>{movie.imdbRating}</h1>
            <p>{movie.genre}</p>

            <button> save </button>
          </form>
        </div>
    );
}
