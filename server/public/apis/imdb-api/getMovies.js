import fetch from "node-fetch"

import dotenv from 'dotenv'
dotenv.config({path: ".env"})

const url = 'https://imdb-api.com/en/API/MostPopularMovies/' + process.env.IMDB_KEY;

fetch(url)
    .then(res => {
        return res.json()
    })
    .then(data => {
        console.log(data)
    })
    .catch(e => {
        console.log('oops', e)
    })