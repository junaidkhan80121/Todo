const notesRouter = require('express').Router()
const noteRoutes = require('../services/notes.services')
const notesController = require('../controllers/note.controller')


notesRouter.get('/', notesController.getNotesController)
notesRouter.post('/addnote', notesController.addNoteController)
notesRouter.delete('/deletenote',notesController.deleteNoteController)
notesRouter.put('/updatenote',notesController.deleteNoteController)
notesRouter.patch('/updatenotestatus',notesController.updateNoteStatusController)


module.exports = notesRouter;