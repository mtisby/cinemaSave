import express from "express"
import { Movie } from "../models/movies";
var router = express.Router();

router.get('/:id', asyncWrap(async (req, res) => {
    console.log(req.body)
    //const movie = await Movie.findById(req.params.id)
}))



const MovieRoutes = router
export { MovieRoutes }