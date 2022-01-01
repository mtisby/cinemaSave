import express from "express"
import { Movie } from "../models/movies.js";
import isLoggedIn from "../middleware/middleware.cjs"

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
            const movie = await Movie.findById(movie_id)
            res.json(movie)
        }  catch (e) { 
            console.log('error')
        }
    } catch (e) { 
        console.log('error')
    }
})



const MovieRoutes = router
export { MovieRoutes }