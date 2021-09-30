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

router.post('/', validateUser, (req, res, next) => {
  User.insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(next);
});

router.put('/:id', [validateUserId, validateUser], (req, res, next) => {
  User.update(req.params.id, req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(next);
});

router.delete('/:id', validateUserId, (req, res, next) => {
  User.remove(req.params.id)
    .then(() => {
      res.status(201).json(req.user);
    })
    .catch(next);
});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  Post.get()
    .then(posts => {
      const userPosts = posts.filter(post => 
        parseInt(req.params.id) === post.user_id
      );
      res.status(201).json(userPosts);
    })
    .catch(next);
});

router.post('/:id/posts', [validateUserId, validatePost], (req, res, next) => {
  const postInfo = {...req.body, user_id: req.params.id};
  Post.insert(postInfo)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(next);
});

module.exports = router;
