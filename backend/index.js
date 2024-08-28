import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';

dotenv.config({
    path: "./.env"
})

const __dirname = path.resolve();

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser);


app.listen(3000, () => {
    console.log("server running on port: 3000");
})