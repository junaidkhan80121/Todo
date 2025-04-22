// const noteServices = require('../services/notes.services')
import {noteServices} from '../services/notes.services';
import {Request, Response} from 'express'

export const notesController = {
    getNotesController: async(req:Request,res:Response)=>{
        try{
            const user = (req as Request & { user: any }).user;
            const result = await noteServices.getNotesService(user)
            return res.status(result.status).send(result.payload)
        }catch(err){
            return res.status(500).send({msg:"Internal Server Error"})
        }
    },

    addNoteController: async(req:Request,res:Response)=>{
        try{
            const user = (req as Request & { user: any }).user;
            const result = await noteServices.addNoteService(req.body,user);
            return res.status(result.status).send(result.payload)
        }catch(err:any){
            return res.status(500).send({msg:"Internal Server Error "+err.message})
        }
    },

    deleteNoteController: async(req:Request,res:Response)=>{
        try{
            const user = (req as Request & { user: any }).user;
            const result = await noteServices.deleteNoteService(req.body,user);
            return res.status(result.status).send(result.payload)
        }catch(err){
            return res.status(500).send({msg:"Internal Server Error"})
        }
    },

    updateNoteController:async(req:Request,res:Response)=>{
        try{
        const user = (req as Request & { user: any }).user;
        const result = await noteServices.updateNoteService(req.body,user)
        return res.status(result.status).send(result.payload)
        }
        catch(err){
            return res.status(500).send("Internal Server Error")
        }
    },

    updateNoteStatusController: async(req:Request,res:Response)=>{
        try{
        const user = (req as Request & { user: any }).user;
        const result = await noteServices.updateNoteStatusService(req.body,user)
        return res.status(result.status).send(result.payload)
        }
        catch(err){
            return res.status(500).send({msg:"Internal Server Error"})
        }
    }
}

exports = notesController;