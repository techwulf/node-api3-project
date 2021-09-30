const express = require('express');

const {
  validateUserId, validateUser, validatePost
} = require('../middleware/middleware');

const User = require('./users-model');
const Post = require('../posts/posts-model');

const router = express.Router();

router.get('/', (req, res, next) => {
  User.get()
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(next);
});

router.get('/:id', validateUserId, (req, res, next) => {
  User.getById(req.params.id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(next);
});

router.post('/', validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  res.status(300);
});

router.put('/:id', [validateUserId, validateUser], (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  res.status(300);
});

router.delete('/:id', validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  res.status(300);
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  res.status(300);
});

router.post('/:id/posts', [validateUserId, validatePost], (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  res.status(300);
});

// do not forget to export the router
module.exports = router;
