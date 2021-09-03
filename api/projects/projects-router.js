
const express = require('express');
const {validateId, validateBody} = require("./projects-middleware");
const Projects = require('./projects-model')

const router = express.Router();
//Get projects
router.get('/', async (req, res, next) => {
    Projects.get()
        .then(projects =>{
            res.status(200).json(projects)
        })
        .catch(next)
})

//Project with given id
router.get("/:id", validateId,(req,res) => {
    res.json(req.projects);
})

//Returns the newly created project as the body
router.post("/",  validateBody, async(req, res, next) => {
    try{
        const newProject = await Projects.insert({
            name: req.name,
            description: req.description,
            completed: req.completed
        })
        res.status(201).json(newProject)
    }
    catch(error){next(error)}
})

router.put("/:id", validateId, validateBody,(req, res, next ) => {
    const {name, description, completed} = req
    Projects.update(req.params.id, {
        name: name,
        description: description,
        completed: completed
    })
        .then(() => {return Projects.get(req.params.id)})



})

router.delete("/:id", validateId, (req,res) => {
    console.log("DELETED PROJECT");
})

router.get("/:id/actions",validateId, (req,res) => {
    console.log("DELETED PROJECT");
})

module.exports = router;