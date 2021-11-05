import express from "express"


const app = express();
const port = process.env.PORT || 3080;


app.get("/", (req, res) => {
    res.send('hello!')
})

app.listen(port, () => {
    console.log(`listening on : ${port}`)
})