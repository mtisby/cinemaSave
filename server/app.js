import dotenv from "dotenv"

if (process.env.NODE_ENV !== "productions") {
    dotenv.config()
}

import express from "express";
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Movie } from "./models/movies.js";

const dbUrl = 'mongodb://localhost:27017/cinema-save';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const debugging = true;

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();
const port = process.env.PORT || 3060;


app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

app.get("/", cors(), async (req, res) => {
    const allMovies = await Movie.find({});
    console.log(allMovies)
    res.json(allMovies) 
})

app.listen(app.listen(port, () => {
    console.log(`listening on : ${port}`)
}))