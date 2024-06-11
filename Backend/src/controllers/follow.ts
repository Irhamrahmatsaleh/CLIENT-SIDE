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
            const followings = await followServices.followSuggested(user, 3);
            res.send(followings);
        } catch(err){
            res.status(500).json({ error: err });;
        }
    }

    async fetchSearchedUser(req: Request, res: Response){
        /*  #swagger.parameters['search'] = {
            description: 'search for users (string)'
        } */
        try{
            const user = res.locals.verifyingUser;
            const search = req.query.search as string;
            const users = await followServices.searchedUsers(search, user);
            res.send(users);
        }catch (err){
            res.status(400).json({ error: err });;
        }
    }

    async setFollowID(req : Request, res : Response)
        /*  #swagger.parameters['followid'] = {
            description: 'id for replies (int)'
        } */
    {
        try {
            const user = res.locals.verifyingUser;
            const likedData = await followServices.setFollow(parseInt(req.params.id), user.id);
            if(!likedData) throw new Error("Follow Error");
            res.json({
                followed_id: parseInt(req.params.id),
                stats: "user followed"
            });
        } catch (err) {
            res.status(404).json({ error: 'Follow Error' });;
        }
    }
}

export default new followController()