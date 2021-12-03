import mongoose from "mongoose"

const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    imdbRating: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    stream: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    languages: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        required: true
    }
})

const Movie = mongoose.model('Movie', movieSchema);

export { Movie }