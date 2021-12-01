import mongoose from "mongoose"

const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    imdbRating: {
        type: Number,
        required: false
    },
    genre: {
        type: String,
        required: true
    },
    stream: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    languages: {
        type: String,
        required: false
    },
    poster: {
        type: String,
        required: true
    }
})

const Movie = mongoose.model('Movie', movieSchema);

export { Movie }