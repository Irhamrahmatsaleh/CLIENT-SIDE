import { AppDataSource } from "./data-source"
import { User } from "./entities/User"
import Express, { Request, Response } from 'express'
import Cors from 'cors'
import Multer from 'multer'
import Bcrypt from 'bcrypt'

AppDataSource.initialize().then(async () => {

    const port = 5000;
    const app = Express();
    const router = Express.Router();
    const upload = Multer();
    const saltRounds = 10;

    app.use(Express.urlencoded({ extended: false }));
    app.use(Cors())
    app.use("/api/v1", router);

    //v1
    const userRepository = AppDataSource.getRepository(User);

    router.get("/user:id", async (req : Request, res: Response) => {
        try {
            const id = req.params.id;
            const userData = await userRepository.findOneBy({
                id: parseInt(id),
            })
            res.send(userData)
        } catch (err) {
            res.sendStatus(400);
        }
    })

    router.post("/user", upload.none(), async (req : Request, res: Response) => {
        try {
            const { username, full_name, email, password, photo, bio } = req.body;
            console.log("body " + req.body.name);
            Bcrypt.hash(password, saltRounds, async function(err, hash) {
                await userRepository.save({
                    username: username,
                    full_name: full_name,
                    email : email,
                    password : hash,
                    photo_profile: photo,
                    bio: bio,
                    created_by: full_name,
                    updated_by: full_name
                });
            });
           
        res.send("User Created");
        } catch (err)
        {   console.log(err);
            res.sendStatus(400);
        }
    })

    router.patch("/user:id", async (req : Request, res: Response) => {
        try {
            const id = req.params.id;
            const { username, name, email, password, photo, bio } = req.body;
            console.log("username " + username);
            
            await userRepository.update(id, {
                username: username,
                full_name: name,
                email : email,
                password : password,
                photo_profile: photo,
                bio: bio,
                created_by: username,
                updated_by: username
            });
        res.send("User Edited");
        } catch (err)
        {   console.log(err);
            res.sendStatus(400);
        }
    })

    router.delete("/user", async (req : Request, res: Response) => {
        try {
            const id = req.params.id;
            const userData = await userRepository.delete(id)
            res.send(userData);
        } catch (err) {
            res.sendStatus(400);
        }
    })


    app.listen(port, () => {
        console.log(`Port ${port} is listening`)
    })

}).catch(error => console.log(error))
