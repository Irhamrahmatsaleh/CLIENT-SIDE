import Express, { NextFunction, Request, Response } from 'express'
import Cors from 'cors'
import userController from './controllers/user'
import threadController from './controllers/thread'
import { upload } from './middlewares/image-thread';
import { authenticateToken } from './middlewares/authentication';
import followController from './controllers/follow';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger-generated.json'

const port = process.env.PORT || 5000;
const app = Express();
const router = Express.Router();

const swaggerOption = {
    explorer: true,
    swaggerOptions: {
      persistAuthorization: true,
    }
}

app.use(Express.urlencoded({ extended: false }));
app.use(Cors())
app.use("/api/v1", router);
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument, swaggerOption));

//v1
router.get("/", (req,res) => {
    res.send("Welcome to API V1");
})

router.post("/register", upload.none(), userController.registerUser)
router.post("/login", upload.none(), userController.loginUser)
router.get("/check",authenticateToken, upload.none(), userController.check)
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

router.get("/search",authenticateToken, upload.none(), followController.fetchSearchedUser)
router.get("/following", authenticateToken, upload.none(), followController.fetchFollowing)
router.get("/follower", authenticateToken, upload.none(), followController.fetchFollower)
router.get("/suggested", authenticateToken, upload.none(), followController.fetchRandomUserSuggestion)

router.get("/like:id",authenticateToken, upload.none(), threadController.setLikedID)
router.get("/unlike:id",authenticateToken, upload.none(), threadController.setUnlikedID)
router.get("/follow:id",authenticateToken, upload.none(), threadController.findIDThread)

app.listen(port, () => {
    console.log(`Port ${port} is listening`)
})

