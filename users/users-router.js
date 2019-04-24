const express = require('express');
const userDb = require('../data/helpers/userDb.js');

const router = express.Router();

// POST route to create a new user.
router.post('/', async (req, res) => {
  try {
    if (req.body.name === '') {
      res.status(400).json({
        errorMessage:
          'Please provide a name to create in order to create a new user'
      });
    } else {
      const newUser = await userDb.insert(req.body);
      res.status(201).json(newUser);
    }
  } catch (error) {
    res.status(500).json({errorMessage: 'Error creating a new user'});
  }
});

// GET Route to get all the users from the database.
router.get('/', async (req, res) => {
  try {
    const users = await userDb.get(req.query);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({errorMessage: 'Error getting the users'});
  }
});

// GET route to get a single user based on the id parameter in the url with the user's posts.
router.get('/:id', async (req, res) => {
  try {
    const user = await userDb.getById(req.params.id, req.body);
    if (!user) {
      res.status(404).json({errorMessage: 'User not found'});
    } else {
      const posts = await userDb.getUserPosts(req.params.id, req.body);
      res.status(200).json({...user, posts});
    }
  } catch (error) {
    res.status(500).json({errorMessage: 'Error getting the user'});
  }
});

// PUT route to edit an existing user.
router.put('/:id', async (req, res) => {
  try {
    if (req.body.name == '') {
      res.status(400).json({errorMessage: 'Please provide a name to the user'});
    } else {
      const updatedUser = await userDb.update(req.params.id, req.body);
      if (!updatedUser) {
        res.status(404).json({errorMessage: 'User not found'});
      } else {
        res.status(201).json(updatedUser);
      }
    }
  } catch (error) {
    res.status(500).json({errorMessage: 'Error updating the user'});
  }
});

// DELETE route to remove an existing user.
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await userDb.remove(req.params.id);
    if (!deletedUser) {
      res.status(404).json({errorMessage: 'User not found'});
    } else {
      res.status(204).end();
    }
  } catch (error) {
    res.status(500).json({errorMessage: 'Error deleting user'});
  }
});

module.exports = router;
