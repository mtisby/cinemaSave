import express from "express"
import { Movie } from "../models/movies.js";
import { Stream } from "../models/streaming.js";
import isLoggedIn from "../middleware/middleware.cjs"
import { Strategy } from "passport-local";
import {streamWeights} from "../algos/streamWeights.js"
const debugLvl1 = true;

var router = express.Router();

router.post('/:id', isLoggedIn, async (req, res) => {
    if(debugLvl1 === true){
        console.log('*******************************')
        console.log('/movie/:id')
        console.log('*******************************')
        console.log(req.body)
    }

    try {
        const movie_id = req.body.movie_id.movie_id
        try {
            const services = await Stream.find({})
            const movie = await Movie.findById(movie_id)
            let streams = movie.stream;

            streams = streamWeights(streams, services);
            console.log(streams)
            
            
            res.json({'movie':movie,'services':services, 'streamMovie':streams})
        }  catch (e) { 
            console.log('error')
        }
    } catch (e) { 
        console.log('error')
    }
})



const MovieRoutes = router
export { MovieRoutes }