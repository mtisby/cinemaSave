import mongoose from "mongoose"
import { Movie } from "../../models/movies.js"
// import { movie_data } from "../../public/apis/imdb-api/getMovies.js"
import fetch from "node-fetch"
import * as csv from 'fast-csv'
import fs from 'fs'

// "http://www.omdbapi.com/?t=Iron+Man&y=&plot=short&tomatoes=true&r=json"

import dotenv from "dotenv"
dotenv.config({ path: "../../.env" })

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/cinema-save';
mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Mongo Database connected");
});

const imdb_url = `https://imdb-api.com/en/API/MostPopularMovies/${process.env.IMDB_KEY}`;
const omdb_url1 = `http://www.omdbapi.com/?t=`
const omdb_url2 = `&apikey=${ process.env.OMDB_KEY }`;
const watchmode_url1 = `https://api.watchmode.com/v1/title/`
const watchmode_url2 = `/sources/?apiKey=${process.env.WATCHMODE_KEY_TWO}`;

// get watchmode csv data
const watchmode_csvfile = './title_id_map.csv'
let watchmodeArr = {}
let keys = ['Watchmode ID', ' IMDB ID', ' TMDB ID', ' TMDB Type'];

fs.createReadStream(watchmode_csvfile)
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', row => {
        watchmodeArr[row[keys[1]]] = row
    })
    .on('end', rowCount => {
        console.log(`Parsed ${rowCount} rows from Watchmode Movies`)
        

        fetch(imdb_url)
            .then(res => {
                return res.json()
            })
            .then(imdbData => {
                console.log("...fetching imdb data")
                let N = imdbData['items'].length;

                console.log(`...fetched ${N} movies`)
                let imdbMovies = imdbData['items'];
                
                for (var i = 0; i < N; i++) {
                    let imdbMovie = imdbMovies[i];

                    let title = imdbMovie.fullTitle;
                    let year = imdbMovie.year;
                    let rating = imdbMovie.imDbRating;
                    let poster = imdbMovie.image;


                    let queriedTitle = imdbMovie.title.split(' ').join('+');
                    let queried_ID = null;
                    try {
                        queried_ID = watchmodeArr[imdbMovie.id][keys[0]];
                    }
                    catch {
                        queried_ID = ''
                    }
                    

                    if (queried_ID != '') {
                        let watchmodeData = fetch(watchmode_url1 + queried_ID + watchmode_url2)
                        let omdbData = fetch(omdb_url1 + queriedTitle + omdb_url2)


                        Promise.all([watchmodeData, omdbData])
                            .then(values => Promise.all(values.map(value => value.json())))
                            .then(finalVals => {
                                let watchmodeData_Parsed = finalVals[0];
                                let omdbData_Parsed = finalVals[1];

                                let stream = [];

                                let watchmodeKeys = Object.keys(watchmodeData_Parsed);
                                watchmodeKeys.map((movie) =>{
                                    if(watchmodeData_Parsed[movie].region === 'US' && watchmodeData_Parsed[movie].web_url != null){
                                        stream.push(watchmodeData_Parsed[movie].web_url)
                                    }
                                })

                                const movie = new Movie({
                                    title: title,
                                    year: year,
                                    imdbRating: rating,
                                    genre: omdbData_Parsed.Genre,
                                    stream: stream,
                                    description: omdbData_Parsed.Plot,
                                    languages: omdbData_Parsed.Language,
                                    poster: poster
                                })
                                movie.save()
                            })
                            .catch(e => {
                                console.log('oops', e)
                            })
                    } else {
                        fetch(omdb_url1 + queriedTitle + omdb_url2)
                            .then(res => {
                                return res.json()
                            })
                            .then(omdbData_Parsed => {
                                let stream = 'none'
                                const movie = new Movie({
                                    title: title,
                                    year: year,
                                    imdbRating: rating,
                                    genre: omdbData_Parsed.Genre,
                                    stream: stream,
                                    description: omdbData_Parsed.Plot,
                                    languages: omdbData_Parsed.Language,
                                    poster: poster
                                })
                                movie.save()
                            })
                            .catch(e => {
                                console.log('oops', e)
                            })
                    }
                    
                }
            
            })
            .then(x => {
                console.log('finished')
            })
            .catch(e => {
                console.log('oops', e)
            })
    });


//     const fetch = require('node-fetch');

// let url = 'https://api.watchmode.com/v1/title/345534/sources/?apiKey=YOUR_API_KEY';

// fetch(url, { method: 'Get' })
//     .then((res) => res.json())
//     .then((json) => {
//         console.log(json);
//     });