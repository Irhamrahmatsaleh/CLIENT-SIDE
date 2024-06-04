import { PrismaClient } from "@prisma/client"
import Bcrypt from 'bcrypt'
import { loginSchema, loginValidate, registerSchema, registerValidate } from "../dto/user";
import jwt from 'jsonwebtoken'
import 'dotenv/config'


 class userService {
    private prisma : PrismaClient;
    private saltRound : number;
    constructor()
    {
        this.saltRound= 10;
        this.prisma = new PrismaClient();
    }

    async FindUser(id : number){
        
       const fetchedData = await this.prisma.users.findFirst({where: {id: id}})
       delete fetchedData.password;
       return fetchedData;
    }

    async RegisterUser(dto : registerSchema) {
        try {
            const validate = registerValidate.validate(dto);
        
            if (validate.error) {
              throw new Error(JSON.stringify(validate.error));
            }

            if(!dto.email)
                {
                    throw new Error("Email empty");
                }
            if(!dto.password)
                {
                    throw new Error ("Password empty");
                }

            const hashedPassword = await new Promise<string>((resolve, reject) => {
                Bcrypt.hash(dto.password, this.saltRound, async function(err, hash) {
                    if (err)
                        {
                            reject(new Error("error hashing"));
                        } else {
                            resolve(hash);
                        }
                    });
            });

            const createdData = await this.prisma.users.create({ 
                data: {
                    full_name: dto.full_name,
                    email : dto.email,
                    password : hashedPassword,
                    created_by: dto.full_name,
                    updated_by: dto.full_name
                }
            });
            if(!createdData) throw new Error("error create data");
            return createdData.email;
        } catch (err)
        {
            throw new Error(err);
        }
    }

    async LoginUser(dto : loginSchema){
        try {
            const validate = loginValidate.validate(dto);
        
            if (validate.error) {
              throw new Error(JSON.stringify(validate.error));
            }
        
            const user = await this.prisma.users.findUnique({
              where: {
                email: dto.email,
              },
            });
        
            if (!user) throw new Error("User not found!");
        
            const isValidPassword = await Bcrypt.compare(dto.password, user.password);
        
            if (!isValidPassword) throw new Error("Password Invalid");
        
            delete user.password;
        
            const jwtSecret = process.env.JWT_SECRET;
        
            const token = jwt.sign(user, jwtSecret);
        
            return { token, user };
          } catch (err) {
            throw new Error(err);
          }
    }

    async UpdateUser(idUser : number,dto : registerSchema){
        const hashedPassword = await new Promise<string>((resolve, reject) => {
            Bcrypt.hash(dto.password, this.saltRound, async function(err, hash) {
                if (err)
                    {
                       reject(new Error(err));
                    } else {
                        resolve(hash);
                    }
                });
            });
    
            const data = {
                full_name: dto.full_name,
                email : dto.email,
                password : hashedPassword,
                created_by: dto.full_name,
                updated_by: dto.full_name
            }
    
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    if(!data[key]) delete data[key];
                }
            }
        try {

            const validate = registerValidate.validate(dto);
        
            if (validate.error) {
              throw new Error(JSON.stringify(validate.error));
            }

            const dataUpdate = await this.prisma.users.update(
                {
                    where: { id : idUser},
                    data: {...data}
                });
            if(!dataUpdate) throw new Error("error update data");
            delete dataUpdate.password;
            return dataUpdate;
        } catch (err) {
            throw new Error(err);
        }
    }

    async DeleteUser(idUser : number)
    {
        try {
            const deletedData = await this.prisma.users.delete({
                where: {
                    id : idUser
                }
            })
            delete deletedData.password;
            return deletedData;
        } catch (err)
        {
            throw new Error(err);
        }
    }
}

export default new userService();