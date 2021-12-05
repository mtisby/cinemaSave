import express from "express"
import { Movie } from "../models/movies.js";
var router = express.Router();

router.post('/:id', async (req, res) => {
    console.log(req.body)
    const id = req.body.id
    const movie = await Movie.findById(id)
    res.json(movie)
})



const MovieRoutes = router
export { MovieRoutes }