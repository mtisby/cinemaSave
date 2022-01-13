import dotenv from "dotenv"
dotenv.config({ path: "../../.env" })
import fetch from "node-fetch"
import mongoose from "mongoose"
import {Stream} from "../../models/streaming.js"

let url = `https://api.watchmode.com/v1/sources/?apiKey=${process.env.WATCHMODE_KEY_TWO}`
const dbUrl = 'mongodb://localhost:27017/cinema-save';
mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Mongo Database connected");
});


fetch(url)
    .then(res => {
        return res.json()
    })
    .then(res => {
        res.map((service) => {
            const {id, name, type, logo_100px, ios_appstore_url, android_playstore_url, android_scheme, ios_scheme, regions} = service
            const stream = new Stream({
                id, name, type, logo_100px, ios_appstore_url, android_playstore_url, android_scheme, ios_scheme, regions
            })
            stream.save()
        })
    })