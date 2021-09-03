const express = require('express');
const server = express();
const projectsRouter = require('./projects/projects-router');
const actionsRouter = require('./actions/actions-router');
// const notFoundError = (err, req, res, next) =>{
//     res.status(404).json({message: "nothing found"});
//     next()
// }
// const funkyError = (err, req, res, next) => {
//     const status = err.stat || 500;
//     res.status(status).json({message: err.message})
//     next();
// }
server.use(express.json());
server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);
//server.use(funkyError);
//server.use(notFoundError);


server.get('/', (req, res) => {
    res.send(`<h2>4.1.5 Sprint Challenge</h2>`);
});

module.exports = server;