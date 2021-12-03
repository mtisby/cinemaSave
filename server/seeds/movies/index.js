import mongoose from "mongoose"
import { Movie } from "../../models/movies.js"
// import { movie_data } from "../../public/apis/imdb-api/getMovies.js"
import fetch from "node-fetch"
import * as csv from 'fast-csv'
import fs from 'fs'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import dotenv from "dotenv"
dotenv.config({ path: "../../.env" })

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/cinema-save';
mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const imdb_url = `https://imdb-api.com/en/API/MostPopularMovies/${process.env.IMDB_KEY}`;
const omdb_url1 = `http://www.omdbapi.com/?t=`
const omdb_url2 = `&apikey=${ process.env.OMDB_KEY }`;
const watchmode_url1 = `https://api.watchmode.com/v1/search/?apiKey=${process.env.WATCHMODE_KEY}&search_field=name&search_value=`
const watchmode_url2 = '/sources/'

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
            let N = imdbData['items'].length;
            let imdbMovies = imdbData['items'];
            
            const seedDB = async () => {
                for (var i = 0; i < 1; i++) {
                    let imdbMovie = imdbMovies[i];

                    let title = imdbMovie.fullTitle;
                    let year = imdbMovie.year;
                    let rating = imdbMovie.imDbRating;


                    let queriedTitle = imdbMovie.title.split(' ').join('+');
                    let queried_ID = watchmodeArr[imdbMovie.id][keys[0]];


                    let watchmodeData = fetch(watchmode_url1+queried_ID+watchmode_url2)
                    let omdbData = fetch(omdb_url1 + queriedTitle + omdb_url2)

                    Promise.all([watchmodeData, omdbData])
                        .then(values => Promise.all(values.map(value => value.json())))
                        .then(finalVals => {
                            let watchmodeData = finalVals[0];
                            let omdbData = finalVals[1];

                            let stream = watchmodeData.web_url;
                            if (stream === undefined) {
                                stream = "none"
                            }
                            
                            console.log(stream)
                            const movieObj = new Movie({
                                title: title,
                                year: year,
                                imdbRating: rating,
                                genre: omdbData.Genre,
                                stream: stream,
                                description: omdbData.Plot,
                                languages: omdbData.Language,
                                poster: omdbData.Poster
                            })

                        })
                        
                    
                }
                await movieObj.save();
            }


        })
        .catch(e => {
            console.log('oops', e)
        })
    });


// seedDB().then(() => {
//     mongoose.connection.close();
// })

// for (let i = 0; i < N; i++) {
//     let movie = movie_data[0];
//     console.log(movie)
// }

/* For later !! */
// const seedDB = async () => {
//     await Campground.deleteMany({});
//     for (let i = 0; i < 31; i++) {
//         const random1000 = Math.floor(Math.random() * 1000);
//         const price = Math.floor(Math.random() * 20) + 10;
//         const camp = new Campground({
//             author: '618c285b033eb93a92b5cc73',
//             location: `${cities[random1000].city}, ${cities[random1000].state}`,
//             title: `${sample(descriptors)} ${sample(places)}`,
//             geometry: {
//               type: "Point",
//               coordinates: [
//                   cities[random1000].longitude,
//                   cities[random1000].latitude,
//               ]
//           },
//             images: [
//                 images[i],
//                 images[i+1]
//               ],
//               description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
//               price
//           })
//         await camp.save();
//         console.log(camp.images[0].url)
//     }
// }

// seedDB().then(() => {
//     mongoose.connection.close();
// })