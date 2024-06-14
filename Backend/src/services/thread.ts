import { PrismaClient } from '@prisma/client';
import { dataContent_thread, thread, threadValidate } from '../dto/thread';
import {v2 as cloudinary} from 'cloudinary';
import {users} from '../dto/user'

class threadServices {
    private prisma : PrismaClient;

      constructor()
      {
        this.prisma = new PrismaClient();
        cloudinary.config({ 
          cloud_name: process.env.CLOUDINARY_NAME, 
          api_key: process.env.CLOUDINARY_API_KEY, 
          api_secret: process.env.CLOUDINARY_SECRET 
        });
      }

    async FindThread(idUser : number){
      try{  
        const fetchedData = await this.prisma.threads.findMany({
          where: {created_by: idUser},
          include : {
            users: {
              select: {
                username: true,
                full_name: true,
                photo_profile: true
              }
            },
            likes:{
              select: {
                user_id : true
              }
            },
            replies:{
              select: {
                user_id : true
              }
            },
          },
        })
        if (fetchedData){
            const threadData = fetchedData.map(data => {
            const likesID = new Set(data.likes.map(l => l.user_id))
            const replyID = new Set(data.replies.map(r => r.user_id))
            const isliked = likesID.has(idUser);
            const isReplied = replyID.has(idUser);
            data.number_of_replies = data.replies.length;

            return {...data, isliked, isReplied}
          })
          return threadData;
        } else {
          throw new Error("All Thread Empty");
        }
      } catch (error){
        throw new Error(error);
      }
    }

    async FindThreadID(idThread : number){
      try{  
        const fetchedData = await this.prisma.threads.findFirst({
          where: {id: idThread},
          include : {
            users: {
              select: {
                username: true,
                full_name: true,
                photo_profile: true
              }
            },
            likes:{
              select: {
                user_id : true
              }
            },
            replies:{
              select: {
                user_id : true
              }
            },
          },
        })
        if (fetchedData){
          const likesID = new Set(fetchedData.likes.map(l => l.user_id))
          const replyID = new Set(fetchedData.replies.map(r => r.user_id))
          const isliked = likesID.has(idThread);
          const isReplied = replyID.has(idThread);
          fetchedData.number_of_replies = fetchedData.replies.length;

          const threadData =  {
            ...fetchedData, isliked, isReplied
          }
          
          return threadData;
        } else {
          throw new Error("All Thread Empty");
        }
      } catch (error){
        throw new Error(error);
      }
    }

    async FindAllThread(idCurrentUser : number){
      try{
        const fetchedData = await this.prisma.threads.findMany({
          include : {
            users: {
              select: {
                username: true,
                full_name: true,
                photo_profile: true
              }
            },
            likes:{
              select: {
                user_id : true
              }
            },
            replies:{
              select: {
                user_id : true
              }
            },
          },
        })

        if (fetchedData){
          const threadData = fetchedData.map(data => {
            const likesID = new Set(data.likes.map(l => l.user_id))
            const replyID = new Set(data.replies.map(r => r.user_id))
            const isliked = likesID.has(idCurrentUser);
            const isReplied = replyID.has(idCurrentUser);
            data.number_of_replies = data.replies.length;

            return {...data, isliked, isReplied}
          })
          return threadData;
        } else {
          throw new Error("All Thread Empty");
        }

      } catch (error){
        throw new Error(error);
      }
    }

    
    async FindAllImage(){
      try{
        const fetchedData = await this.prisma.threads.findMany({
          include : {
            users: {
              select: {
                username: true,
                full_name: true,
                photo_profile: true
              }
            },
            likes:true
          },
        })

        if (fetchedData){
          return fetchedData;
        } else {
          throw new Error("All Image Empty");
        }

      } catch (error){
        throw new Error(error);
      }
    }

    async FindRepliesID(idThread : number){
      try{  
        const fetchedData = await this.prisma.replies.findMany({
          where: {thread_id: idThread},
          include : {
            users : {
              select : {
                photo_profile : true,
                username : true,
                full_name : true
              }
            }
          }
        })
        if (fetchedData){
          return fetchedData;
        } else {
          throw new Error("All Thread Empty");
        }
      } catch (error){
        throw new Error(error);
      }
    }

    async PostReplies(dto : dataContent_thread, user : users, idThread : number)
    {
      
        try {
            const validate = threadValidate.validate(dto);
        
            if (validate.error) {
              throw new Error('validate error');
            }

           // Upload image if provided
          let imageUrl = null;
          if (dto.image) {
            const upload = await cloudinary.uploader.upload(dto.image, {
                upload_preset: "threads"
            });
            imageUrl = upload.secure_url;
        }
            
            const createdData = await this.prisma.replies.create({ 
                data: {
                    user_id: user.id,
                    thread_id: idThread,
                    content: dto.content,
                    image: imageUrl,
                    created_by: user.id,
                    updated_by: user.id,
                }
            });

            if(!createdData) throw new Error("error create data");
            return createdData;
        } catch (err)
        {
          console.error(err);
            throw new Error(err);
        }
    }

    async PostThread(dto : dataContent_thread, user : users)
    {
      
        try {
            const validate = threadValidate.validate(dto);
        
            if (validate.error) {
              throw new Error('validate post thread error');
            }

           // Upload image if provided
          let imageUrl = null;
          if (dto.image) {
            const upload = await cloudinary.uploader.upload(dto.image, {
                upload_preset: "threads"
            });
            imageUrl = upload.secure_url;
          }
            
            const createdData = await this.prisma.threads.create({ 
                data: {
                    content: dto.content,
                    image: imageUrl,
                    created_by: user.id,
                    updated_by: user.id
                }
            });

            if(!createdData) throw new Error("error create threads");
            return createdData;
        } catch (err)
        {
          console.error(err);
            throw new Error(err);
        }
    }

    async UpdateThread(idUser : number, dto : dataContent_thread){
        const data : dataContent_thread = {
            content : dto.content,
            image : dto.image
          }

        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                if(!data[key]) delete data[key];
            }
        }
    try {
        const validate = threadValidate.validate(dto);
        
        if (validate.error) {
          throw new Error(JSON.stringify(validate.error));
        }

        const dataUpdate = await this.prisma.threads.update(
            {
                where: { id : idUser},
                data: {...data}
            });
        if(!dataUpdate) throw new Error("error update data");
        return dataUpdate;
    } catch (err) {
        throw new Error(err);
    }
    }
    async DeleteThread(idUser : number)
    {
        try {
            const deletedData = await this.prisma.threads.delete({
                where: {
                    id : idUser
                }
            })
            
            return deletedData;
        } catch (err)
        {
            throw new Error(err);
        }
    }

    async setLiked(idThread : number, idUser : number){
      try {
        const likedData = await this.prisma.likes.create({
          data : {
            user_id: idUser,
            thread_id: idThread,
            created_by: idUser,
            updated_by: idUser
          }
        })
        return likedData;
      } catch(err){
        throw new Error(err);
      }
    }

    async setUnliked(idThread : number, idUser : number){
      try {
        const unlikedData = await this.prisma.likes.deleteMany({ where: {
          user_id : idUser,
          thread_id: idThread
        }})
        return unlikedData;
      } catch(err){
        throw new Error(err);
      }
    }
}

export default new threadServices()