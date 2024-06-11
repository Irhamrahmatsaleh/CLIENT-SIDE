import { PrismaClient } from "@prisma/client";
import { UserJWTPayload } from "../types/payload";
import { number } from "joi";
import { following, users } from "../dto/user";

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
            return follower
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

    async searchedUsers(word : string, thisUser : UserJWTPayload){
        try {
            let users : users[];
            if(word[0] === '@')
                {
                    users = await this.prisma.users.findMany({
                        where: {
                            username: {
                                contains: word,
                                mode: 'insensitive'
                            }
                        }
                    })
                } else {
                    users = await this.prisma.users.findMany({
                        where: {
                            full_name: {
                                contains: word,
                                mode: 'insensitive'
                            }
                        }
                    })
                }
                users.forEach((item) => {
                    delete item.password;
                })
                console.log('users',users);

                const followed = await this.prisma.following.findMany({
                    where: {
                        follower_id: thisUser.id,
                    },
                });

                console.log('users followed',followed);

                const followedUserIds = new Set(followed.map(f => f.followed_id));

                const followedArr = users.map(user => {
                    const isFollowed = followedUserIds.has(user.id);
                    return { ...user, isFollowed };
                });
                console.log('followedarr',followedArr);
            return(followedArr);
        } catch (err) {
            throw new Error(err);
        }
    }

    async setFollow(idFollowed : number, idUser : number){
        try {
          const followData = await this.prisma.following.create({
            data : {
              follower_id: idUser,
              followed_id: idFollowed,
            }
          })
          return followData;
        } catch(err){
          throw new Error(err);
        }
      }
}

export default new followServices();