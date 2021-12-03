import mongoose from "mongoose"
import { Movie } from "../../models/movies.js"
// import { movie_data } from "../../public/apis/imdb-api/getMovies.js"
import fetch from "node-fetch"

import dotenv from "dotenv"
dotenv.config({ path: "../../.env" })

// const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/cinema-save';
// mongoose.connect(dbUrl);

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", () => {
//     console.log("Database connected");
// });

const imdb_url = `https://imdb-api.com/en/API/MostPopularMovies/${process.env.IMDB_KEY}`;
const omdb_url1 = `http://www.omdbapi.com/?t=`
const omdb_url2 = `&apikey=${ process.env.OMDB_KEY }`;
const watchmode_url = `https://api.watchmode.com/v1/search/?apiKey=${process.env.WATCHMODE_KEY}&search_field=name&search_value=`


// functions 
// function getMovieData() {
//     let imdbData = fetch(imdb_url);
//     let omdbData = fetch(omdb_url);
//     //let watchModeData = fetch(watchmode_url);

    

//     Promise.all([imdbData, omdbData])
//         .then(values => Promise.all(values.map(value => value.json())))
//         .then(finalVals => {
//             let imdbMovies = finalVals[0];
//             let omdbMovies = finalVals[1];
            

//             console.log(omdbMovies)
//         })
// }

// getMovieData()


// fetch data from imdb-api
fetch(imdb_url)
    .then(res => {
        return res.json()
    })
    .then(imdbData => {
        let N = imdbData['items'].length;
        let imdbMovies = imdbData['items'];
        
        for (var i = 0; i < 2; i++) {
            let imdbMovie = imdbMovies[i];

            // call omdb-api here
            // call watchmode-api here
            let queriedTitle = imdbMovie.title.split(' ').join('+');
            fetch(omdb_url1 + queriedTitle + omdb_url2)
                .then(res => {
                    return res.json()
                })
                .then(omdbData => {
                    console.log(omdbData)
                })


            // const movieObj = new Movie({
            //     title: imdbMovie.fullTitle,
            //     year: imdbMovie.year,
            //     imdbRating: imdbMovie.imDbRating,
            //     // genre: omdbMovie.genre,
            //     // stream: watchMode
            //     // description: omdbMovie.description,
            //     // languages: omdbMovie.languages,
            //     poster: imdbMovie.image
            // })
            
        }


    })
    .catch(e => {
        console.log('oops', e)
    })



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