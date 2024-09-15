import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Book from "./Models/bookModel.js";
import bodyParser from "body-parser";

const app = express();
dotenv.config();

const mongoDBURL = process.env.ConnStr;

app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.get('/', (req, res) => {
    res.send("Hello from my MERN Project.");
});

//Route to add a Book.
app.post('/books', async(req, res) => {

    try {

        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({
                message: 'Enter all required fields.',
            });
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }

        const book = await Book.create(newBook);
        return res.status(201).send(book);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }

});

//Route to get all books.
app.get('/books', async(req, res) => {
    try {

        const books = await Book.find();
        return res.status(200).json(books);
        // res.status(200).send(books); uh can use this but upper is best for APIs.

    } catch (error) {

        console.log(error.message);
        res.status(500).send({ message: error.message });

    }
});

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