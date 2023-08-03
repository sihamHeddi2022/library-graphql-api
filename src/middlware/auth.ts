import { NextFunction, Request,Response} from "express";
import { AppError } from "../exception";
import jwt from 'jsonwebtoken';

export const verifyToken = async(req:Request | any,res:Response,next:NextFunction)=>{
   
    const authorizationHeader = req.headers.authorization;
     
    if(authorizationHeader?.split(" ")[0]=="Bearer"){
        const token = authorizationHeader.replace('Bearer ', '');
        
        const key:string | any = "HELLO_ITS_ME"


         jwt.verify(token,key,function(err:any,payload:any){
            if (err) {
                const e = err as Error
                if (e.name=="TokenExpiredError") {
                    throw new AppError(401,"token expired")
 
               }
               else {
                throw new AppError(401,"invalid token")

               }
    
          }
          req.user = payload.id
          return next()

        }) 

    }
    else {
       new AppError(401,"verify the authorization header")
    }     
 
} 