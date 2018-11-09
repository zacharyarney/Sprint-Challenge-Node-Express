const express = require('express');
const projectDb = require('../data/helpers/projectModel');
const actionDb = require('../data/helpers/actionModel');

const server = express();

// --MIDDLEWARE--
server.use(express.json());

// --EXPORT--
module.exports = server;
