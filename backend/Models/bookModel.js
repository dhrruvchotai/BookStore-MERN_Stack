import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    publishYear: {
        type: Number,
        require: true
    }
}, {
    timestamps: true, // automatically adds createdAt and updatedAt fields to your documents.
});

const Book = mongoose.model("Book", bookSchema);

export default Book;