import fetch from "node-fetch"

import dotenv from 'dotenv'
dotenv.config({path: ".env"})

let url = `http://www.omdbapi.com/?apikey=${process.env.OMDb_KEY}&`;

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