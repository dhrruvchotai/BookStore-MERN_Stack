import express from 'express';
import Book from '../Models/bookModel.js';
import bodyParser from 'body-parser';


const router = express.Router();


router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());


//All book routes

//Route to add a Book.
router.post('/book', async(req, res) => {

    try {

        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).json({
                message: 'Enter all required fields.',
            });
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }

        const book = await Book.create(newBook);
        return res.status(201).json(book);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }

});

//Route to get all books.
router.get('/', async(req, res) => {
    try {

        const books = await Book.find();

        return res.status(200).json({
            count: books.length,
            data: books
        });

        // res.status(200).json(books); uh can use this but upper is best for APIs.

    } catch (error) {

        console.log(error.message);
        res.status(500).json({ message: error.message });

    }
});

//Route to get a book by id.
router.get('/book/:id', async(req, res) => {
    try {

        const id = req.params.id;
        const book = await Book.findById(id);

        return res.status(200).json(book);

    } catch (error) {

        console.log(error.message);
        res.status(500).json({ message: error.message });

    }
});

//Route to update a book.
router.put('/book/:id', async(req, res) => {

    try {

        if (!req.body.title || !req.body.author || !req.body.publishYear) {

            return res.status(400).json("Please, enter all the required fields book name, author name, publish year.");

        } else {

            const id = req.params.id;
            const result = await Book.findByIdAndUpdate(id, req.body);

            if (!result) {
                return res.status(404).json({ message: 'Book not found!!' });
            }

            return res.status(200).json({ message: "Book updated successfully." });

        }

    } catch (error) {

        console.log(error.message);
        res.status(500).json({ message: error.message });

    }

});


//Route to delete a book by id.
router.delete('/book/:id', async(req, res) => {

    try {
        const id = req.params.id;

        if (!id) {
            res.status(400).json({ message: "Invalid ID" });
        }

        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: "Book not found!!" });
        }

        return res.status(200).json({ message: "Book deleted successfully." });

    } catch (error) {

        console.log(error.message);
        return res.status(500).json({ message: error.message });

    }

});

export default router;