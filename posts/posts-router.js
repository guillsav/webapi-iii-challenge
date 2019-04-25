const express = require('express');
const postDb = require('../data/helpers/postDb.js');

const router = express.Router();

// POST route to create a new post
router.post('/', async (req, res) => {
  try {
    if (req.body.text !== '' && req.body.user_id !== '') {
      const newPost = await postDb.insert(req.body);
      res.status(201).json(newPost);
    } else {
      res.status(400).json({errorMessage: 'Please provide text for the post'});
    }
  } catch (error) {
    res.status(500).json({errorMessage: 'Error creating the new post'});
  }
});

// GET route to receive all the posts
router.get('/', async (req, res) => {
  try {
    const posts = await postDb.get(req.query);
    if (posts) {
      res.status(200).json(posts);
    }
  } catch (error) {
    res.status(500).json({errorMessage: 'Error retrieving the posts'});
  }
});

// GET route to receive on post by the id of the post
router.get('/:id', async (req, res) => {
  try {
    const post = await postDb.getById(req.params.id, req.body);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({errorMessage: 'Post not found'});
    }
  } catch (error) {
    res.status(500).json({errorMessage: 'Error retrieving the post'});
  }
});

// PUT route to edit a post
router.put('/:id', async (req, res) => {
  try {
    if (req.body.text === '') {
      res
        .status(400)
        .json({errorMessage: 'Please provide text to update the post'});
    } else {
      const editedPost = await postDb.update(req.params.id, req.body);
      if (editedPost) {
        res.status(201).json(editedPost);
      } else {
        res.status(404).json({errorMessage: 'Post not found'});
      }
    }
  } catch (error) {
    res.status(500).json({errorMessage: 'Error updating the post'});
  }
});

// DELETE route to delete a post
router.delete('/:id', async (req, res) => {
  try {
    const deletedPost = await postDb.remove(req.params.id);
    if (deletedPost) {
      res.status(204).end();
    } else {
      res.status(404).json({errorMessage: 'Post not found'});
    }
  } catch (error) {
    res.status(500).json({errorMessage: 'Error deleting the post'});
  }
});

module.exports = router;
