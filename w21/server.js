const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

/* -------------------------------
 CONNECT DATABASE
--------------------------------*/
mongoose.connect('mongodb://127.0.0.1:27017/bookstore')
.then(() => {
  console.log("DB Connected");

  app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
  });
})
.catch(err => console.log(err));

/* -------------------------------
 SCHEMA
--------------------------------*/
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  price: Number,
  genre: String
});

const Book = mongoose.model('books', bookSchema);

/* -------------------------------
 ADD BOOK
--------------------------------*/
app.get('/add', async (req, res) => {
  await Book.create({
    title: "Clean Code",
    author: "Robert C. Martin",
    price: 500,
    genre: "Programming"
  });

  res.send("Book Added");
});

/* -------------------------------
 VIEW ALL BOOKS
--------------------------------*/
app.get('/books', async (req, res) => {
  const data = await Book.find();
  res.send(data);
});

/* -------------------------------
 UPDATE BOOK
--------------------------------*/
app.get('/update/:title', async (req, res) => {
  await Book.updateOne(
    { title: req.params.title },
    { $set: { price: 700 } }
  );

  res.send("Book Updated");
});

/* -------------------------------
 DELETE BOOK
--------------------------------*/
app.get('/delete/:title', async (req, res) => {
  await Book.deleteOne({ title: req.params.title });
  res.send("Book Deleted");
});