const express = require('express');
const server = express();
const projectsRouter = require('./projects/projects-router');
const actionsRouter = require('./actions/actions-router');
server.use(express.json());
server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);


server.get('/', (req, res) => {
    res.send(`<h2>4.1.5 Sprint Challenge</h2>`);
});

module.exports = server;