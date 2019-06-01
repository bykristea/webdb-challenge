const express = require('express');
const helmet = require('helmet')
const knex = require('knex');
const server = express();
const dbConfig = require('./knexfile');

const db = knex(dbConfig.development);
const PORT = 9000;

server.use(express.json());
server.use(helmet());


//sanity check is server up?
server.get('/', (req, res) => {
    res.status(200).json({ hello: 'World!' });
  });

//POST endpoint for Projects

//POST endpoint for actions

//GET endpoint for Projects

// Get for project by id

server.listen(PORT, () =>{
    console.log(`\nAPI running on port ${PORT}\n`)
})
