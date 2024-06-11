import { Request, Response } from "express";
import user from "../services/user";
import { registerSchema } from "../dto/user";


class userController {
    async findUser(req : Request, res: Response){
        const idUser : number = parseInt(req.params.id);
        let userData : registerSchema;
        try {
            userData = await user.FindUser(idUser);
            if(!userData) throw new Error("User not found");
            res.send(userData);
        } catch (err) {
            res.status(404).json({ error: 'User not found' });;
        }
    }

    async registerUser(req : Request, res: Response){
         /*  #swagger.requestBody = {
                required: true,
                content: {
                    "multipart/form-data": {
                        schema: {
                            $ref: "#/components/schemas/registerSchema"
                        }  
                    }
                }
            } 
        */
        try {
            const dataCreated = await user.RegisterUser(req.body)
            res.status(201).json({
                stats: "user created",
                email: dataCreated
            });

        } catch (err)
        { 
            res.status(400).send(err + ", data has not been saved");
        }
    }

    async loginUser(req : Request, res : Response){
         /*  #swagger.requestBody = {
                required: true,
                content: {
                    "multipart/form-data": {
                        schema: {
                            $ref: "#/components/schemas/loginSchema"
                        }  
                    }
                }
            } 
        */
        try {
            const userData = await user.LoginUser(req.body);
            res.status(200).json(
                {
                    user: userData,
                    message: "login success"
                }
            );
          } catch (err) {
            res.status(400).send(err + ", login failed");
          }
    }

    async check(req: Request, res: Response) {
        try {
          res.json(res.locals.verifyingUser);
        } catch (error) {
          res.status(500).json({
            message: error.message,
          });
        }
      }

    async updateUser(req : Request, res : Response){
         /*  #swagger.parameters['userid'] = {
            description: 'id for user (int)'
        } */
        /*  #swagger.requestBody = {
                required: true,
                content: {
                    "multipart/form-data": {
                        schema: {
                            $ref: "#/components/schemas/registerSchema"
                        }  
                    }
                }
            } 
        */
        try {           
            try {
                const dataUpdated : registerSchema = await user.UpdateUser(parseInt(req.params.id),req.body)
    
                res.status(201).json({
                    stats: "data updated",
                    email: dataUpdated.email
                });
            } catch(createErr) {
                res.status(500).json({ error: 'Create User error', details: createErr.message});
            }
        } catch (err)
        {  
            res.status(400).json({ error: 'Create User error'});
        }
    }

    async deleteUser(req : Request, res : Response){
        /*  #swagger.parameters['userid'] = {
            description: 'id for user (int)'
        } */
            try {
                const idUser : number = parseInt(req.params.id);
                const userData = await user.DeleteUser(idUser);
                res.status(201).json({
                    stats: "data deleted",
                    email: userData.email
                }).send;
            } catch (err) {
                res.sendStatus(400);
            }
        }
}

export default new userController();