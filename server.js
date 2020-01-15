const express = require('express');
const moment = require('moment');

// Import userRouter 
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

const server = express();

server.use(express.json());
server.use('/users', userRouter);
server.use('/posts', postRouter);

server.get('/', logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  // console.log request method, request url, and a timestamp
  console.log("Request Method-->", req.method);
  console.log("Request URL-->", req.url);
  console.log("Request Timestamp-->", moment().format('LTS'));
  next();
}

server.use(logger);

module.exports = server;
