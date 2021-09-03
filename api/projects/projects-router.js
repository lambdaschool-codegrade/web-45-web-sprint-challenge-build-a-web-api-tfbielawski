
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
    console.log("CREATED PROJECT");
    try{
        const newProject = await Projects.insert({
            name: req.name,
            description: req.description,
            completed: req.completed
        })
    }
    catch(error){next(error)}
})

router.put("/:id", validateId, validateBody,(req, res, next ) => {
    console.log("UPDATED PROJECT");


})

router.delete("/:id", validateId, (req,res) => {
    console.log("DELETED PROJECT");
})

router.get("/:id/actions",validateId, (req,res) => {
    console.log("DELETED PROJECT");
})

module.exports = router;