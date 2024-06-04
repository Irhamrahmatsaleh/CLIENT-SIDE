import { Request, Response } from "express";
import followServices from "../services/follow";

class followController{
    async fetchFollowing(req: Request, res: Response){
        try {
            const user = res.locals.verifyingUser;
            const followings = await followServices.followingList(user);
            res.send(followings);
        } catch(err){
            res.status(500).json({ error: 'Following not found' });;
        }
    }

    async fetchFollower(req: Request, res: Response){
        try {
            const user = res.locals.verifyingUser;
            const followings = await followServices.followerList(user);
            res.send(followings);
        } catch(err){
            res.status(500).json({ error: 'Follower not found' });;
        }
    }

    async fetchRandomUserSuggestion(req: Request, res: Response){
        try {
            const user = res.locals.verifyingUser;
            const followings = await followServices.followSuggested(user, 5);
            res.send(followings);
        } catch(err){
            res.status(500).json({ error: err });;
        }
    }
}

export default new followController()