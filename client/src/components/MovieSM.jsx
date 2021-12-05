import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import movieFunctions from "../api/index"

export const MovieSM = () => {
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

    return (
        <div>
            <h1>{movie.title}</h1>
            <h1>{movie.imdbRating}</h1>
            <p>{movie.genre}</p>
        </div>
    );
}
