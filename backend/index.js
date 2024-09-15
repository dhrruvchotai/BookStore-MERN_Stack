import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js'
import bodyParser from "body-parser";
import cors from "cors"

const app = express();
dotenv.config();

const mongoDBURL = process.env.ConnStr;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

//Middleware to use all the books routes.
app.use('/books', booksRoute);

//Middleware for handling cors policy(while fetching api in react)

//method1 : allow all origins with a default of cors(*)
// app.use(cors());

//method2 : allow custom origins
app.use(cors({
    origin: 'http://localhost:4140',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['content-Type']
}));

//Connection To DB
mongoose
    .connect(mongoDBURL)

.then(() => {
    console.log("Successfully Connected to Database.");

    app.listen(process.env.PORT, () => {
        console.log(`Sever is running on PORT : ${process.env.PORT}`)
    });
})

.catch((error) => {
    console.log(error);
});