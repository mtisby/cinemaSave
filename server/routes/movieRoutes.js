import express from "express"
import { Movie } from "../models/movies.js";
import isLoggedIn from "../middleware/middleware.cjs"

var router = express.Router();

router.post('/:id', isLoggedIn, async(req, res) => {
    console.log(req.body)
    const id = req.body.id
    const movie = await Movie.findById(id)
    res.json(movie)
})



const MovieRoutes = router
export { MovieRoutes }