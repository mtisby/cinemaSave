import express from "express";
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import cors from 'cors';
import { fileURLToPath } from 'url';

const app = express();

const dbUrl = 'mongodb://localhost:27017/cinema-save';

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

app.listen(app.listen(port, () => {
    console.log(`listening on : ${port}`)
}))