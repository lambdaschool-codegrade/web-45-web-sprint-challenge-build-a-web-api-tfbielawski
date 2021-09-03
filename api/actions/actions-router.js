// Write your "actions" router here!
const express = require("express");
const Actions = require("../actions/actions-model");
const router = express.Router();

//Array of projects
router.get("/", (req, res) => {
    Actions.get()
        .then(actions=>{ res.status(200).json(actions); })
        .catch();
});

//Project with given id
router.get("/:id", (req,res) => {
    res.json(req.actions);
})

//Returns the newly created project as the body
router.post("/", (req,res) => {
    console.log("CREATED ACTION");
})

router.put("/:id", (req,res) => {
    console.log("UPDATED ACTION");
})

router.delete("/:id", (req,res) => {
    console.log("DELETED ACTION");
})


module.exports = router;