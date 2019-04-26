const express = require('express');
const userDb = require('../data/helpers/userDb.js');

// Custom Middleware.
const checkForName = require('../middlewares/checkForName.js');

//  Router created
const router = express.Router();

router.post('/', checkForName, (req, res) => {
  const newUser = req.body;
  userDb
    .insert(newUser)
    .then(user => res.status(200).json(user))
    .catch(err =>
      res
        .status(500)
        .json({errorMessage: 'Error creating user in the database'})
    );
}); // Route to CREATE a new user in the database.

router.get('/', (req, res) => {
  userDb
    .get()
    .then(users => res.status(200).json(users))
    .catch(err =>
      res
        .json(500)
        .json({errorMessage: 'Error retrieving users from the database'})
    );
}); // Route to GET all the users from the database.

router.get('/:id', (req, res) => {
  const {id} = req.params;
  userDb
    .getById(id)
    .then(user => {
      if (user === undefined) {
        res.status(404).json({errorMessage: `User ID doesn't exist`});
      } else {
        res.status(200).json(user);
      }
    })
    .catch(err =>
      res
        .status(404)
        .json({errorMessage: `Error getting the user from the database`})
    );
}); // Route to GET a single existing user from the database.

router.get('/posts/:userId', async (req, res) => {
  try {
    const posts = await userDb.getUserPosts(req.params.userId, req.body);
    const user = await userDb.getById(req.params.userId, req.body);

    if (!user) {
      res.status(404).json({errorMessage: 'User not found in the database'});
    } else if (posts.length === 0) {
      res.status(404).json({errorMessage: 'Not post found for this user '});
    } else {
      res.status(200).json({...user, posts});
    }
  } catch (error) {
    res.status(500).json({errorMessage: 'Error getting the user posts'});
  }
}); // Route to GET an existing user and the user's posts from the database.

router.put('/:id', checkForName, (req, res) => {
  const {id} = req.params;
  userDb
    .update(id, req.body)
    .then(user => {
      if (user === 0) {
        res.status(404).json({errorMessage: `User ID doesn't exist`});
      } else {
        res.status(202).json(user);
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({errorMessage: 'Error updating the user in the database'})
    );
}); // Route to UPDATE an existing user from the database.

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const deletedUser = await userDb.remove(id, req.body);

    if (deletedUser) {
      res
        .status(200)
        .json({message: 'User was successfuly deleted from the database.'});
    } else {
      res.status(404).json({errorMessage: 'User ID not found.'});
    }
  } catch (error) {
    res
      .status(500)
      .json({errorMessage: 'Error deleting the user from the database.'});
  }
}); // Route to DELETE an existing user from the database.

// Exporting users router.
module.exports = router;
