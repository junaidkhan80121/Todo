export const notesRouter = require('express').Router()
import {notesController} from '../controllers/note.controller';
import { isLoggedIn } from '../middlewares/auth.middleware';

notesRouter.use(isLoggedIn)

notesRouter.get('/', notesController.getNotesController)
notesRouter.post('/addnote', notesController.addNoteController)
notesRouter.delete('/deletenote',notesController.deleteNoteController)
notesRouter.put('/updatenote',notesController.updateNoteController)
notesRouter.patch('/updatenotestatus',notesController.updateNoteStatusController)


exports = notesRouter;