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

//POST endpoint for projects
server.post('/api/projects', (req, res) => {
    const project = req.body;
    if(!project.name || !project.description) {
        res.status(409).json({err:'must add required project fields'})
    }
    else{
    db('Projects').insert(project)
    .then(projectData => {
        res.status(201).json(projectData);
    })
    .catch(err => {
        res.status(500).json({err:'unable to add data'})
    })};
});

//POST endpoint for actions
server.post('/api/actions', (req, res) => {
    const action = req.body;
    db('Actions').insert(action)
        .then(actionData => {
        res.status(201).json(actionData);
    })
    .catch(err => {
        res.status(500).json({err:'cannot add action'})
    });
});

//GET endpoint for Projects
server.get('/api/projects', (req, res) => {
    db('Projects')
    .then(projectId => {res.json(projectId)})
    .catch(err => {res.status(500).json({message: 'there was an error'})})
})
// Get for project by id
server.get('/api/projects/:id', (req, res) => {
    const {id} = req.params;
    db('Projects').where('id', id)
    .then(projectId => {
        db('Actions')
    .then(actions => {
            const project_actions = actions.filter(action => action.project_id === Number(id))
            projectId[0]['actions'] = project_actions
            res.json(projectId)
        })
    .catch(err => {res.status(500).json({err: 'action could not be retrieved'})})
    })
    .catch(err => {res.status(500).json({message: 'project could not be retrieved'})})
})

//get actions
server.get('/api/actions', (req, res) => {
    db('Actions')
    .then(actionId => {res.json(actionId)})
    .catch(err => {res.status(500).json({message: 'there was an error'})})
})

//Update project/:id
server.put('/api/projects/:id', async (req, res) => {
    const changes = req.body;
  
    if (changes.name || changes.description || changes.completed) {
      try {
        const updated = await Projects.update(req.params.id, req.params.description, req.params.completed, changes);
        if (updated) {
          res.status(200).json(updated);
        } else {
          res.status(404).json({
            message: 'That project does not exist',
          });
        }
      } catch (error) {
        res
          .status(500)
          .json({ message: 'We ran into an error updating the project' });
      }
    } else {
      res.status(400).json({
        message: 'Please provide the name of the project',
      });
    }
  });

//Update actions/:id

//Delete action/:id

//Delete Project/:id


server.listen(PORT, () =>{
    console.log(`\nAPI running on port ${PORT}\n`)
})
