// Write your "actions" router here!
const express = require("express");
const {validateActionId, validateActionBody} = require("./actions-middlware");
const Actions = require("./actions-model");

const router = express.Router();

//Array of projects
router.get("/", (req, res, next) => {
    Actions.get()
        .then(actions=>{ res.status(200).json(actions); })
        .catch(next);
});

//Action with given id
router.get("/:id", validateActionId, (req, res) => {
    res.json(req.actions);
})

//Returns the newly created action
router.post("/", validateActionBody, async (req,res, next) => {
    try{
        const newAction = await Actions.insert({
            project_id: req.project_id,
            description: req.description,
            completed: req.completed,
            notes: req.notes,
        })
        res.status(201).json(newAction)
    }
    catch(error){next(error)}
})

router.put("/:id", validateActionId, validateActionBody, (req, res, next) => {
    Actions.update(req.params.id, {
        project_id: req.project_id,
        description: req.description,
        completed: req.completed,
        notes: req.notes,
    })
        .then(() => {return Actions.get(req.params.id)})
        .then(action => {res.json(action)})
        .catch(next)
})

router.delete("/:id", validateActionId, async (req, res, next ) => {
    const id = req.params.id;
    try{
        const result = await Actions.remove(id)
        res.json(result)
    }
    catch(error){next(error)}
})

//Next
// router.use((err, req, res, next) => {
//     res.status(500).json({
//         message: "Error handling function message",
//         error: err.message
//     })
//     next();
// })

module.exports = router;