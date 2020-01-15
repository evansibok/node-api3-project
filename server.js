const express = require('express');
const moment = require('moment');

const server = express();

server.use(express.json());

server.get('/', logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  // request method, request url, and a timestamp
  // req.method, req.url, req
  console.log("Request Method-->", req.method);
  console.log("Request URL-->", req.url);
  console.log("Request Timestamp-->", moment().format('LTS'));
  next();
}

server.use(logger);

module.exports = server;
