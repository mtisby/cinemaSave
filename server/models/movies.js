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
        required: false
    },
    genre: {
        type: String,
        required: false
    },
    stream: {
        type: Array,
        required: false
    },
    description: {
        type: String,
        required: false
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