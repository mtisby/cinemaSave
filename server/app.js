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
import cookieParser from "cookie-parser";
import methodOverride from "method-override"

// routes
import { UserRoutes } from "./routes/userRoutes.js"
import { MovieRoutes } from "./routes/movieRoutes.js"

// authentication
import passport from 'passport'
import LocalStrategy from 'passport-local'
let localStrategy = LocalStrategy.Strategy
import * as ExpressError from "./utilis/ExpressError.cjs"
import isLoggedIn from "./middleware/middleware.cjs"

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
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static(__dirname + '/public'));


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
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

app.use(cookieParser(secret))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})

app.get("/home", cors(), isLoggedIn, async (req, res) => {
    const allMovies = await Movie.find({});
    res.json(allMovies)
})

app.use('/authentication', UserRoutes);
app.use('/movie', MovieRoutes);


app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500, message = "something went wrong" } = err;
    res.status(statusCode)
    res.json(err)
})


app.listen(app.listen(port, () => {
    console.log(`listening on : ${port}`)
}))