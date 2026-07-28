import express from 'express';

let app = express();

app.get("/", (req, res) => {
    res.send("hello world")
})
const port = 3000;


app.listen(port, () => {
    console.log(`We are online on ${port}`)
})