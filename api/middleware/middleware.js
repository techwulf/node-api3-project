const User = require('../users/users-model');

function logger(req, res, next) {
  const now = new Date();
  console.log(
    `A ${req.method} request to ${req.originalUrl} on ${now}`
  );
  next();
}

async function validateUserId(req, res, next) {
  const user = await User.getById(req.params.id);
  if (user) {
    req.user = user;
    next();
  } else {
    next({status: 404, message: 'user not found'});
  }
}

function validateUser(req, res, next) {
  const {name} = req.body;
  if (name) {
    next();
  } else {
    next({status: 400, message: 'missing required name field'});
  }
}

function validatePost(req, res, next) {
  const {text} = req.body;
  if (text) {
    next();
  } else {
    next({status: 400, message: 'missing required text field'});
  }
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}