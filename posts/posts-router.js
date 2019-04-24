const express = require('express');
const postDb = require('../data/helpers/postDb');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await postDb.get(req.query);
    if (posts) {
      res.status(200).json(posts);
    }
  } catch (error) {
    res.status(500).json({message: 'Error retrieving the posts'});
  }
});

module.exports = router;
