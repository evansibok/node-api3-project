const express = require('express');

const userDb = require('./userDb');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
  res.status(201).json({ message: "New user created" })
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
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

  // const { userToPost } = req.body;
  // if(!userToPost){
  //   res.status(400).json({ message: "missing user data" })
  // } else if (!userToPost.name){
  //   res.status(400).json({ message: "missing required name field" })
  // } else {
  //   next();
  // }

  // try {
  //   const { userToPost } = req.body;
  //   if (!userToPost) {
  //     res.status(400).json({ message: "missing user data" })
  //   } else {

  //   }
  // } catch {

  // }
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
