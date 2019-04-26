const express = require('express');
const postDb = require('../data/helpers/postDb.js');
const userDb = require('../data/helpers/userDb.js');

// Custom middlewares
const checkText = require('../middlewares/checkText.js');
const checkuserId = require('../middlewares/checkUserId');
const isUserId = require('../middlewares/isUserId');

// Router created.
const router = express.Router();

// Routes
router.post('/', isUserId, checkText, checkuserId, async (req, res) => {
  console.log(req.body);
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

router.delete('/users/:user_id', async (req, res) => {
  try {
    const postsFromUser = await userDb.getUserPosts(req.params.user_id);

    if (postsFromUser) {
      const deletedPosts = await postsFromUser.map(post => {
        return postDb.remove(post.id).then(posts => res.status(204).end());
      });
    } else {
      res.status(404).json({errorMessage: `Couldn't find user's posts`});
    }
  } catch (error) {
    res.status(500).json({errorMessage: `Error couldn't delete user's posts`});
  }
}); // Route to DELETE all posts from an existing user in the database

// Exporting posts router.
module.exports = router;
