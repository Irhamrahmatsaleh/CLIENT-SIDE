import Express, { NextFunction, Request, Response } from 'express'
import Cors from 'cors'
import userController from './controllers/user'
import threadController from './controllers/thread'
import { upload } from './middlewares/image-thread';
import { authenticateToken } from './middlewares/authentication';
import followController from './controllers/follow';

const port = 5000;
const app = Express();
const router = Express.Router();

app.use(Express.urlencoded({ extended: false }));
app.use(Cors())
app.use("/api/v1", router);

//v1
router.get("/user:id", userController.findUser)
router.post("/register", upload.none(), userController.registerUser)
router.post("/login", upload.none(), userController.loginUser)
router.post("/check",authenticateToken, upload.none(), userController.check)
router.patch("/user:id",authenticateToken, upload.none(), userController.updateUser)
router.delete("/user:id",authenticateToken, userController.deleteUser)

router.get("/thread",authenticateToken, upload.none(), threadController.findAllThread)
router.get("/threadProfile",authenticateToken, upload.none(), threadController.findThread)
router.get("/thread:id",authenticateToken, upload.none(), threadController.findIDThread)
router.post("/threadPost",authenticateToken,upload.single('image'), threadController.postThread)
router.patch("/thread:id",authenticateToken, upload.none(), threadController.updateThread)
router.delete("/thread:id",authenticateToken, threadController.deleteThread)
router.get("/image",authenticateToken, upload.none(), threadController.findImage)

router.get("/replies:id",authenticateToken, upload.none(), threadController.findRepliesID)
router.post("/replies:id",authenticateToken,upload.single('image'), threadController.postReplies)

router.post("/search",authenticateToken, upload.none(), followController.fetchSearchedUser)
router.get("/following", authenticateToken, upload.none(), followController.fetchFollowing)
router.get("/follower", authenticateToken, upload.none(), followController.fetchFollower)
router.get("/suggested", authenticateToken, upload.none(), followController.fetchRandomUserSuggestion)

app.listen(port, () => {
    console.log(`Port ${port} is listening`)
})

