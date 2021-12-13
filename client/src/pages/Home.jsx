import React, { useEffect, useState } from 'react'
// import { Navigate } from 'react-router-dom';
import { Route, Link} from 'react-router-dom';
import movieFunctions from "../api/index.js"
import { MovieSM } from '../components/MovieSM';
import {ReactSession} from 'react-client-session';

// style sheets
import './home.css';

// const handleSubmit = (props) => {
//   console.log(props.userID)
// //   fetch('http://localhost:3060/authentication/profile/addpin/', {
// //       method: 'POST',
// //       headers: { "Content-Type": "application/json" },
// //       body: {
// //         'user_id': 'none',
// //       }
// //   }).then((response) => {
// //       let req = response.json()
// //       console.log(req)
// //       return req
// //   }).then((req) => {
// //     console.log(req)
// //     return req
// // })
// }

const handleClick = (props) => {
  const id = props;
    
  fetch('http://localhost:3060/movie/id', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id })
  }).then((response) => {
    let req = response.json()
    return req
  }).then((req) => {
    if (req !== undefined) {
      <Route to={`/movie/:${id}`} component={MovieSM} />
    }
  })
}

function Home(props) {
  const [movie, setMovies] = useState([]);

  useEffect(() => {
    movieFunctions
      .getAll()
      .then((response) => {
        console.log('promise fulfilled')
        console.log(response)
        setMovies(response.data)
      })
      .then((response) => {
      })
  }, []);

  let userid = ReactSession.get("userid") 
  const movies = movie.map((i) => {
    return (
      <div>
        {/* <a onClick={() => handleClick(i._id)} href={`/movie/${i._id}`}><h1>{i.title}</h1></a> */}
        <Link to={`/movie/${i._id}`} onClick={() => handleClick(i._id)}><h1>{i.title}</h1></Link>
        <img src={i.poster} alt="la" class="poster" />
        <br />

        {/* <form  onSubmit={handleSubmit.bind(this)}>
          <label htmlFor="movieID">movie id</label>
          <input
            type="text"
            value={i._id}
            id="movieID"
          />
          <br />
          <label htmlFor="userID">user id</label>
          <input
            type="text"
            value={userid}
            id="userID"
          />
          <br />
          
          <button>submit</button>
        </form> */}
      </div>)
  });

  return (
    <div className="Home">
      <Link to={`/profile/${userid}`}>Profile</Link>
      <h1>I am the Home Page</h1>
      <br />
      
      {movies}
    </div>
  );
}

export default Home;