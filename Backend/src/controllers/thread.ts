import { Request, Response } from "express";
import threadService from "../services/thread";
import { dataContent_thread } from "../dto/thread";

class threadController {
    async findThread(req : Request, res : Response)
    {
        try {
            const userData : dataContent_thread = await threadService.FindThread(parseInt(req.params.id));
            if(!userData) throw new Error("Thread not found");
            res.send(userData);
        } catch (err) {
            res.status(404).json({ error: 'Thread not found' });;
        }
    }

    async findAllThread(req : Request, res : Response)
    {
        try {
            const userData = await threadService.FindAllThread();
            if(!userData) throw new Error("Thread not found");
            res.send(userData);
        } catch (err) {
            res.status(404).json({ error: 'Thread not found' });;
        }
    }

    async postThread(req : Request, res: Response){
        try {
            const body = {
                ...req.body,
                image: req.file.path,
              }
            const user = res.locals.verifyingUser;
            const dataCreated : dataContent_thread = await threadService.PostThread(body, user)

            res.status(201).json({
                stats: "data created",
                value: dataCreated
            });
            } catch (err)
            { 
                res.status(400).send(err + ", data has not been saved");
            }
    }

    async updateThread(req : Request, res: Response){
        try {           
            const dataUpdated  : dataContent_thread = await threadService.UpdateThread(parseInt(req.params.id),req.body)
            res.status(201).json({
                stats: "data updated",
                value: dataUpdated
            });
        } catch (err)
        {  
            res.status(400).json({ error: 'Create User error'});
        }
    }

    async deleteThread(req : Request, res : Response){
        try {
            const userData : dataContent_thread = await threadService.DeleteThread(parseInt(req.params.id));
            res.status(201).json({
                stats: "data deleted",
                content: userData.content
            }).send;
        } catch (err) {
            res.sendStatus(400);
        }
    }
}

export default new threadController()