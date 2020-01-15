const express = require('express');

const userDb = require('./userDb');
const postDb = require('../posts/postDb');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
  const newUser = req.body;

  userDb.insert(newUser)
    .then(user => {
      res.status(201).json({ message: "New user created" })
    })
    .catch(error => {
      res.status(500).json({
        message: "There was an error adding the user"
      })
    });
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  const userId = req.user.id;
  const newPost = req.body;

  const postData = { ...newPost, user_id: userId };
  postDb.insert(postData)
    .then(data => {
      res.status(201).json(data);
    })
    .catch(error => {
      res.status(500).json({
        message: error.message,
        stack: error.stack,
      });
    });
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  res.status(200).json(req.user);
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

async function validateUserId(req, res, next) {
  // 1- pull the id from req.params.id
  const { id } = req.params;
  // 2- use findById to see if a user comes back or null
  const user = await userDb.getById(id);
  if (user) { // If user with id exists
    req.user = user;
    next();
  } else { // Cancel Request
    res.status(400).json({ message: "invalid user id" })
  }
}

function validateUser(req, res, next) {
  // do your magic!

  // If req.body (object) does not exist - 404
  // If req.body.name (string) does not exist - 404
  // Else next();

  const userToPost = req.body;
  if (Object.keys(userToPost).length === 0) {
    res.status(400).json({ message: "missing user data" })
  } else if (userToPost.name === "") {
    res.status(400).json({ message: "missing required name field" })
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
  const newPost = req.body;
  // if newPost === {} return 400
  // if newPost.text === "" return 400
  // else next();

  if (Object.keys(newPost).length === 0) {
    res.status(400).json({ message: "missing post data" });
  } else if (newPost.text === "") {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
}

module.exports = router;
