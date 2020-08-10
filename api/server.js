const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

const accountsRouter =  require('../accounts/accountsRouter')

server.use(express.json());

server.use('/accounts', accountsRouter)

module.exports = server;
