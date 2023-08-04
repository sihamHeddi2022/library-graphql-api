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
                    req.isAuth = false
                    req.err = {
                        status:401,
                        message:"token expired"
                    }
                  return next()
 
               }
               else {
                req.isAuth = false
                req.err = {
                    status:401,
                    message:"invalid token"
                }
                return next()
              

               }
    
          }
          req.isAuth = true
          req.user = payload.id
          return next()

        }) 

    }
    else {
        req.isAuth = false
        req.err = {
            status:401,
            message:"verify the authorization header"
        }
      return next()
      
    }     
 
} 