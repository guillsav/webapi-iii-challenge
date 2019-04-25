const express = require('express');
const postDb = require('../data/helpers/postDb.js');
const userDb = require('../data/helpers/userDb.js');

// Router Created.
const router = express.Router();

// Custom middlewares
function checkText(req, res, next) {
  const text = req.body.text;

  if (!text || text === '') {
    res.status(404).json({errorMessage: 'Please provide text for the post'});
  } else {
    next();
  }
} // Checks if the text for the post was provided in the request of a POST or PUT route.

function checkuserId(req, res, next) {
  const id = req.body.user_id;

  if (!id || id === '') {
    res
      .status(404)
      .json({errorMessage: 'Please provide a user ID for the post'});
  } else {
    next();
  }
} // Checks if the user ID was provided in the request of a POST or PUT route.

function isUserId(req, res, next) {
  const id = parseInt(req.body.user_id);
  if (id) {
    userDb.getById(id).then(user => {
      if (user) {
        res.status(200).json(1);
      } else {
        res.status(404).json({errorMessage: `User ID doesn't exist`});
      }
    });
  } else {
    res.status(500).json({errorMessage: 'Error checking user'});
  }
  next();
} // Checks if the user ID provided in the request of a POST or PUT route belongs to an existing user in the database.

// Routes
router.post('/', isUserId, checkText, checkuserId, async (req, res) => {
  try {
    const newPost = await postDb.insert(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({
      errorMessage: `Error couldn't create the new post in the database`
    });
  }
}); // Route to CREATE a new post in the database.

router.get('/', async (req, res) => {
  try {
    const posts = await postDb.get(req.body);
    res.status(200).json(posts);
  } catch (error) {
    res
      .status(500)
      .json({errorMessage: 'Error retrieving the posts from the database'});
  }
}); // Route to GET all the posts from the database.

router.get('/:id', async (req, res) => {
  try {
    const foundPost = await postDb.getById(req.params.id, req.body);
    if (foundPost) {
      res.status(200).json(foundPost);
    } else {
      res.status(404).json({errorMessage: 'Post not found'});
    }
  } catch (error) {
    res
      .status(500)
      .json({errorMessage: 'Error retrieving post from the database'});
  }
}); // Route to GET a single post from the database.

router.put('/:id', checkText, checkuserId, async (req, res) => {
  try {
    const editedPost = await postDb.update(req.params.id, req.body);
    if (editedPost) {
      res.status(201).json(editedPost);
    } else {
      res.status(404).json({errorMessage: 'Post ID not found'});
    }
  } catch (error) {
    res
      .status(500)
      .json({errorMessage: 'Error editing the post in the database'});
  }
}); // Route to UPDATE an existing post in the database.

router.delete('/:id', async (req, res) => {
  try {
    const deletedPost = await postDb.remove(req.params.id, req.body);

    if (deletedPost) {
      res.status(204).end();
    } else {
      res.status(404).json({errorMessage: 'Post ID not found'});
    }
  } catch (error) {
    res
      .status(500)
      .json({errorMessage: 'Error deleting post from the database'});
  }
}); // Route to DELETE an existing post in the database

// Exporting router
module.exports = router;
