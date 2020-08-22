const express = require('express');
const router = express.Router();
const db = require('../config/db');
let loggedIn = false;

router.get('/', (req, res) => {
  const getBooks = "SELECT * FROM books";
  db.query(getBooks, (err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    const reversed = results.reverse();
    res.render('index', {
      loggedIn: loggedIn,
      books: reversed
    });
  });
});

router.get('/search', (req, res) => {
  res.render('search', {
    loggedIn: loggedIn,
    found: ''
  });
});

router.get('/book/:id', (req, res) => {
  const id = req.params.id;
  const search = "SELECT * FROM books WHERE book_id LIKE ?";  
  db.query(search, [id], (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    if (results.length <= 0) {
      console.log(`No books with id: ${id} are found`);
    }
    if (results.length > 0) {
      console.log(`Found book with id: ${id}`);
      res.render('book', {
        loggedIn: loggedIn,
        book_name: results[0].book_name,
        book_author: results[0].book_author,
        book_genre: results[0].book_genre,
        book_description: results[0].book_description
      })
    }
  });
});

router.post('/searching', (req, res) => {
  let searchedBook = req.body.searchedBook;
  searchedBook = String(searchedBook);
  console.log(searchedBook);
  const seacrh = "SELECT * FROM books WHERE book_name LIKE '%" + searchedBook + "%'";
  db.query(seacrh, (err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    if (results.length > 0) {
      for (var i = 0; i < results.length; i++) {
        if (results[i].book_name.includes(searchedBook)) {
          console.log('found something on place ' + i);
        }
        res.send(results);
        return;
      }
    } else {
      console.log('No books found');
    }
  });
});

router.get('/admin', (req, res) => {
  res.render('admin', {
    error: '',
    loggedIn: loggedIn
  });
});

router.post('/admin', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username == 'admin' && password == 1234) {
    loggedIn = true;
    res.redirect('/add');
  } else {
    res.render('admin', {
      error: 'Failed to log in as admin. Pleas try again.'
    });
  }
});

router.get('/add', (req, res) => {
  if (loggedIn) {
    res.render('add', {
      msg: 'Successfully logged in as admin. Feel free to add book : )',
      loggedIn: loggedIn
    });
  }
  res.redirect('/');
});

router.post('/add', (req, res) => {
  const bookName = req.body.bookName;
  const genre = req.body.genre;
  const author = req.body.author;
  const description = req.body.description;
  const rating = req.body.rating;
  
  console.log(bookName + " " + genre + " " + author + " " + description + " " + rating);

  const insertBook = "INSERT INTO books (book_name, book_genre, book_author, book_description, book_rating) VALUES (?,?,?,?,?)";
  db.query(insertBook, [bookName, genre, author, description, rating], (err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    console.log('Inserted book in database');
    res.redirect('/');
  });
});

router.get('/logout', (req, res) => {
  loggedIn = false;
  res.redirect('/');
});

module.exports = router;
