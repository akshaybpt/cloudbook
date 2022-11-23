const express = require('express');
const fetchuser = require('../middleware/fetchUser')
const Notes = require('../models/Notes');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// doing the curd operation in the noyes section get data, update data, post data and delete data

// Route 1: get all the notes f a user Get: '/api/notes/fetchnotes' . Login required
router.get('/fetchnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }

})


// Route 2: create a new  notes f a user post: '/api/notes/createnote' . Login required
router.post('/createnote', fetchuser, [
    body('title', 'title can not be blanked ').isLength({ min: 1 }),
    body('description', 'description must be of minimum 5 character').isLength({ min: 3 }),
    body('tag', 'tag must be of minimum 3 character').isLength({ min: 1 }),
], async (req, res) => {

    try {
        const { title, description, tag } = req.body;

        //if errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savednote = await note.save();

        res.json(savednote);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }

})


// Route 3: update a   note f a user put: '/api/notes/updatenote/:id' . Login required

router.put('/updatenote/:id', fetchuser, [
    body('title', 'title can not be blanked ').isLength({ min: 3 }),
    body('description', 'description must be of minimum 8 character').isLength({ min: 3 }),
], async (req, res) => {


    try {
        // create a new note object
        const { title, description, tag } = req.body;
        const newNote = ({});

        if (title) {
            newNote.title = title;
        }

        if (description) {
            newNote.description = description;
        }

        if (tag) {
            newNote.tag = tag;
        }

        // find the note to be updated and update it 
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("not found");// note does not exist
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(404).send("not found");// if user id is diiffernrt  user is trying to acess other user notes
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})


// Route 3: delete a   note f a user put: '/api/notes/deletenote/:id' . Login required

router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {

        // find the note to be deleted and delete it 
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("not found");// note does not exist
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(404).send("not found");// if user id is diiffernrt  user is trying to acess other user notes
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "Sucess": "note has been deleted" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

module.exports = router