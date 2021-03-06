const express = require('express');
const projectDb = require('../data/helpers/projectModel');
const actionDb = require('../data/helpers/actionModel');

const server = express();

// --MIDDLEWARE--
server.use(express.json());

// --PROJECT ENDPOINTS--
server.get('/api/projects', (req, res) => {
  projectDb
    .get()
    .then((projects) => res.status(200).json({ projects }))
    .catch((err) => {
      res.status(500).json({ message: 'could not find projects', err });
    });
});

server.get('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  projectDb
    .get(id)
    .then((project) => res.status(200).json({ project }))
    .catch((err) => {
      res.status(500).json({ message: 'could not find project', err });
    });
});

server.get('/api/projects/:id/actions', (req, res) => {
  const projectId = req.params.id;
  projectDb
    .getProjectActions(projectId)
    .then((projectActions) => res.status(200).json({ projectActions }))
    .catch((err) => {
      res.status(500).json({ message: 'no actions for this project', err });
    });
});

server.post('/api/projects', (req, res) => {
  const project = req.body;
  projectDb
    .insert(project)
    .then((id) => {
      projectDb.get(id.id).then((projectById) => {
        res.status(200).json({ projectById });
      });
    })
    .catch((err) => {
      let message = 'error creating project';
      if (err.errno === 19) {
        message = 'please provide a name, description and completed status';
      }
      res.status(400).json({ message, err });
    });
});

server.put('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  projectDb
    .update(id, changes)
    .then((count) => {
      if (count) {
        res.status(200).json({ message: `project updated successfully` });
      } else {
        res.status(404).json({ message: 'no prject with that id exists' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: 'the project could not be updated', err });
    });
});

server.delete('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  projectDb
    .remove(id)
    .then((count) => {
      if (count) {
        res.status(200).json({ message: `project deleted successfully` });
      } else {
        res.status(404).json({ message: 'no project with that id exists' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: 'the project could not be deleted', err });
    });
});

// --ACTION ENDPOINTS--
server.get('/api/actions', (req, res) => {
  actionDb
    .get()
    .then((actions) => res.status(200).json({ actions }))
    .catch((err) => {
      res.status(500).json({ message: 'could not find actions', err });
    });
});

server.get('/api/actions/:id', (req, res) => {
  const { id } = req.params;
  actionDb
    .get(id)
    .then((action) => res.status(200).json({ action }))
    .catch((err) => {
      res.status(500).json({ message: 'could not find action', err });
    });
});

server.post('/api/actions', (req, res) => {
  const action = req.body;
  actionDb
    .insert(action)
    .then((id) => {
      actionDb.get(id.id).then((actionById) => {
        res.status(200).json({ actionById });
      });
    })
    .catch((err) => {
      let message = 'error creating action';
      if (err.errno === 19) {
        message = 'please provide a name, description and completed status';
      }
      res.status(400).json({ message, err });
    });
});

server.put('/api/actions/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  actionDb
    .update(id, changes)
    .then((count) => {
      if (count) {
        res.status(200).json({ message: `action updated successfully` });
      } else {
        res.status(404).json({ message: 'no prject with that id exists' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: 'the action could not be updated', err });
    });
});

server.delete('/api/actions/:id', (req, res) => {
  const { id } = req.params;
  actionDb
    .remove(id)
    .then((count) => {
      if (count) {
        res.status(200).json({ message: `action deleted successfully` });
      } else {
        res.status(404).json({ message: 'no action with that id exists' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: 'the action could not be deleted', err });
    });
});

// --EXPORT--
module.exports = server;
