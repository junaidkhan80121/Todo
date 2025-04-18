const noteServices = require('../services/notes.services')
// const notesService = require('../services/notes.services')

const notesController = {
    getNotesController: async(req,res)=>{
        try{
            const result = await noteServices.getNotesService(req.user)
            return res.status(result.status).send(result.payload)
        }catch(err){
            return res.status(500).send({msg:"Internal Server Error"})
        }
    },

    addNoteController: async(req,res)=>{
        try{
            const result = await noteServices.addNoteService(req.body,req.user,res);
            return res.status(result.status).send(result.payload)
        }catch(err){
            return res.status(500).send({msg:"Internal Server Error"})
        }
    },

    deleteNoteController: async(req,res)=>{
        try{
            const result = await noteServices.deleteNoteService(req.body,req.user,res);
            return res.status(result.status).send(result.payload)
        }catch(err){
            return res.status(500).send({msg:"Internal Server Error"})
        }
    },

    updateNoteController:async(req,res)=>{
        try{
        const result = await noteServices.updateNoteService(req.body,req.user,res)
        return res.status(result.status).send(result.payload)
        }
        catch(err){
            return res.status(500).send("Internal Server Error")
        }
    },

    updateNoteStatusController: async(req,res)=>{
        try{
        const result = await noteServices.updateNoteStatusService(req.body,req.user,res)
        return res.status(result.status).send(result.payload)
        }
        catch(err){
            return res.status(500).send({msg:"Internal Server Error"})
        }
    }
}

module.exports = notesController;