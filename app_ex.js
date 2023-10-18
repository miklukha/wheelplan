const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const Category = require('./models/category');
const { error } = require('console');

require('dotenv').config();
const { DB_HOST, PORT = 3000 } = process.env;
// Express app
const app = express();

mongoose.set('strictQuery', true); // ensure that only the fields that are specified in your Schema will be saved in the database

// Connect to MongoDB
mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true, // remove the warning in console
    useUnifiedTopology: true, // remove the warning in console
  })
  .then(() => {
    // Listen for request
    app.listen(PORT);
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });

// Middlewares and static files
app.use(express.static('public'));

// app.use((req, res, next) => {
//   console.log('new request made:');
//   console.log('host: ', req.hostname);
//   console.log('path: ', req.path);
//   console.log('method: ', req.method);
//   next();
// });

// Mongoose and Mongo sandbox routes
app.get('/category', (req, res) => {
  const category = new Category({
    name: 'Стосунки',
    color: '#FF0000',
    rating: 7,
  });

  category
    .save()
    .then(result => {
      res.send(result);
    })
    .catch(error => {
      console.log(error);
    });
});

app.get('/categories', (req, res) => {
  Category.find()
    .then(result => {
      res.send(result);
    })
    .catch(error => {
      console.log(error);
    });
});

app.get('/category/:id', async (req, res) => {
  const { id } = req.params;

  const result = await Category.findById(id);
  if (!result) {
    const error = new Error();
    error.status = 404;
    return error;
  }
  res.json(result);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/about.html'));
});

// Redirects
app.get('/about-us', (req, res) => {
  res.redirect('/about');
});

// 404 Page
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '/views/404.html'));
});
