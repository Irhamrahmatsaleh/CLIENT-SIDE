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
        const fetchedData = await this.prisma.threads.findFirst({where: {id: idUser}})
        return fetchedData;
      } catch (error){
        throw new Error(error);
      }
    }

    async FindAllThread(){
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
          throw new Error("All Thread Empty");
        }

      } catch (error){
        throw new Error(error);
      }
    }

    async PostThread(dto : dataContent_thread, user : users)
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
            
            const createdData = await this.prisma.threads.create({ 
                data: {
                    content: dto.content,
                    image: imageUrl,
                    created_by: user.id,
                    updated_by: user.id
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
}

export default new threadServices()