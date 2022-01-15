import { Movie } from "../../models/movies.js";
import mongoose from "mongoose";

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/cinema-save';
mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const deleteMovies = async () => {
    await Movie.deleteMany({});
    console.log('deleted')
}

deleteMovies()