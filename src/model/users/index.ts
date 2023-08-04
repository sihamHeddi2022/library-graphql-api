import prisma from "..";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { AppError } from "../../exception";


  export const login = async (user)=>{
   
    try {
        const {email,password} = user       
        let  u:any = await prisma.user.findFirst({where:{ email: email}})
        if(!u) throw new AppError(401,"there is no user with that email")
        const answer =await  bcrypt.compare(password,u.password)
        if(!answer) throw new AppError(401,"password is not correct")
        console.log(u);
        
        const token = jwt.sign({id:u.id},"HELLO_ITS_ME",{expiresIn:"3d"})
        return token 

    } catch (error) {
        console.log(error);
        
      throw error
       
    }
  
  
  
  
  }
  
  
  export const register = async (user)=>{
  

    try {
        let {fullName ,email,password} = user
        let  u = await prisma.user.findFirst({where:{ email: email}})
    
      if(u) throw new AppError(400,"email must be unique")
    

      password = await bcrypt.hash(password, 8);
        
  

     u = await  prisma.user.create({
        data:{fullName,email,password}
      })
   
 
      const token = jwt.sign({id:u.id},"HELLO_ITS_ME",{expiresIn:"3d"})
      
      return token; 


    } catch (error) {
    
        
      throw error
      
    }
  
  
  }
  