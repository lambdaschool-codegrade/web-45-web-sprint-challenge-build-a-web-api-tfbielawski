const Projects = require("./projects-model");

async function validateId ( req, res, next) {
    try{
        const projects = await Projects.get(req.params.id);
        if(!projects){ next({status: 404, message: "no such user" }) }
        //Assign user object to req.user, call next
        else {
            req.projects = projects;
            next();
        }
    }
    catch(error) {
        res.status(500).json({message: "problem finding user"})
    }
}

async function validateBody(req, res, next) {
    const { name, description, completed } = req.body
    if (!name || !name.trim()) {
        res.status(400).json({ message:" missing required name field"})
    }
    else if (!description || !description.trim()) {
        res.status(400).json({ message:"missing required description field"})
    }
    // else if (!completed) {
    //     res.status(400).json({ message:"missing required description field"})}
    else {
        req.name = name.trim()
        req.description = description.trim()
        req.completed = completed
        next()
    }
}

module.exports= {validateId, validateBody};