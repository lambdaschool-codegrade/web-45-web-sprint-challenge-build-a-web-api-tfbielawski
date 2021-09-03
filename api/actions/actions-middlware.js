// add middlewares here related to actions
const Actions = require("./actions-model");

async function validateActionId ( req, res, next) {
    try{
        const actions = await Actions.get(req.params.id);
        if(!actions){ next({status: 404, message: "no such user" }) }
        //Assign user object to req.user, call next
        else {
            req.actions = actions;
            next();
        }
    }
    catch(error) {
        res.status(500).json({message: "problem finding user"})
    }
}

async function validateActionBody(req, res, next) {
    const { project_id, description, completed, notes } = req.body
    if (!project_id|| !project_id) {
        res.status(400).json({ message: "missing project id"})
    }
    else if (!description || !description.trim()) {
        res.status(400).json({ message:"missing description "})
    }
     else if (!notes || !notes.trim()) {
        res.status(400).json({ message:"missing notes"})}
    else {
        req.project_id = project_id;
        req.description = description.trim();
        req.completed = completed;
        req.notes = notes.trim();
        next();
    }
}

module.exports= {validateActionId, validateActionBody};