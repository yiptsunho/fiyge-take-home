import express from 'express';
import dotenv from "dotenv"
const app = express();
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })
const port = process.env.PORT;


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
