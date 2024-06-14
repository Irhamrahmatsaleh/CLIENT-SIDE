import { Request, Response } from "express";
import user from "../services/user";
import { registerSchema } from "../dto/user";
import { transporter } from "../libs/nodemailer";
import jwt from 'jsonwebtoken'

class userController {
    async findUser(req : Request, res: Response){
        try {
            const userLocals = res.locals.verifyingUser
            const userData = await user.FindUser(userLocals.id);
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
            console.log("BODY", req.body);
            const dataCreated = await user.RegisterUser(req.body)
            const token = jwt.sign(dataCreated.id.toString(), process.env.JWT_SECRET);
            const fullUrl = req.protocol + "://" + req.get("host");

            const info = await transporter.sendMail({
            from: `Circle <${process.env.EMAIL_ADDRESS}>`, // sender address
            to: dataCreated.email, // list of receivers
            subject: "Verification Link", // Subject line
            html: `<a href="${fullUrl}/api/v1/verify-email?token=${token}">Klik untuk verifikasi email kamu!</a>`, // html body
            });

            await user.createVerification(token, "EMAIL");
            res.status(201).json({
                stats: "user created",
                email: dataCreated.email,
                smtp: info
            });

        } catch (err)
        { 
            res.status(400).send(err.message + ", data has not been saved");
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

    async verifyEmail(req: Request, res: Response) {
        try {
          const token = req.query.token as string;
          await user.verify(token);
          const frontendUrl = process.env.FRONTEND_URL;
          res.redirect(`${frontendUrl}/login`);
        } catch (error) {
          res.status(500).json({
            message: error.message,
          });
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
                const body = {
                    ...req.body,
                    photo_profile: (req.file ? req.file.path : null),
                  }
                const userData = res.locals.verifyingUser;
                const dataUpdated : registerSchema = await user.UpdateProfile(userData.id,body)
    
                res.status(201).json({
                    stats: "data updated",
                    email: dataUpdated.email
                });
            } catch(createErr) {
                res.status(500).send({ error: 'Create User error', details: createErr.message});
            }
        } catch (err)
        {  
            res.status(400).send({ error: 'Create User error'});
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