import { PrismaClient } from "@prisma/client";
import { UserJWTPayload } from "../types/payload";
import { number } from "joi";
import { following } from "../dto/user";

class followServices {
    private prisma : PrismaClient;

    constructor(){
        this.prisma = new PrismaClient();
    }

    async followingList(user : UserJWTPayload){
        try{
            const followed = await this.prisma.following.findMany({
                where: {
                  follower_id: user.id,
                },
                include:{
                    followed: true
                }
              });
            return followed;
        } catch(err) {
            throw new Error(err);
        }
    }

    async followerList(user : UserJWTPayload,){
        try{
            const follower = await this.prisma.following.findMany({
                where:{
                    followed_id: user.id
                },
                include:{
                    follower: true
                }
            });
            return follower;
        } catch(err) {
            throw new Error(err);
        }
    }

    async followSuggested(user : UserJWTPayload,limit : number){
        try {
            const userCount = await this.prisma.following.count();
            const skip = Math.floor(Math.random() * Math.max(userCount - limit));

            const followed = await this.prisma.following.findMany({
                take: limit,
                skip: skip,
                include: {
                    follower: {
                        select: {
                            full_name: true,
                            username: true,
                            photo_profile: true,
                        },
                    },
                },
            });
            const followedArr = followed.map((follow) => {

                // delete follow.followed.password;
                if (follow.followed_id === user.id) {
                return { ...follow, isFollowed: true };
                }
                
                return { ...follow, isFollowed: false };
            });
            return followedArr;
        } catch(err) {
            throw new Error(err);
        }
    }
}

export default new followServices();