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

import session from "express-session"

// routes
import { UserRoutes } from "./routes/userRoutes.js"
import { MovieRoutes } from "./routes/movieRoutes.js"

// authentication
import passport from 'passport'
import LocalStrategy from 'passport-local'

// models
import { User } from './models/user.js'

// sanitize
import MongoStore from "connect-mongo"
import mongoSanitize from "express-mongo-sanitize"

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

app.set('views', path.join(__dirname, 'views'))


const secret = 'hello'

const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret
    }
});

const sessionConfig = {
    store,
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(mongoSanitize({
    replaceWith: "_"
}))

app.use(session(sessionConfig))


app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})

app.get("/", cors(), async (req, res) => {
    const allMovies = await Movie.find({});
    res.json(allMovies) 
})

app.use('/authentication', UserRoutes);
app.use('/movie', MovieRoutes);

app.listen(app.listen(port, () => {
    console.log(`listening on : ${port}`)
}))