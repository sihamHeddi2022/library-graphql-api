import prisma from ".."
import { AppError } from "../../exception";



// export const getbooks=async (limit:number)=>{
    
//     try {
//      const books = await prisma.book.findMany({take:limit})
//     return books
//     } catch (error) {
//       throw error
//     }

//  }
 
 

// export const getBookByID=async (id)=>{

//     try {

        
//         const book = await prisma.book.findUnique({where:{ id: parseInt(id)}})
//        return book
//        } catch (error) {
//          throw error
//        }

// }

export const addBook=async (input)=>{
   try {
    console.log("jj");
    
    const book = await prisma.book.create({
        data: {
         ...input
        },
      })
      
      
   return {data:book}
   } catch (error) {
    console.log(error);
    
     throw error
   }
    

} 

export const updateBook=async ({id,ownerID,book})=>{
    try {
        const bb = await prisma.book.findFirstOrThrow({
            where:{
                id:parseInt(id)
            }
         })
    
         if(bb.ownerID != ownerID)  throw new AppError(401,"you are unauthorized to do this action")
    
      const b = await prisma.book.update({
        where:{
            id:parseInt(id)
        },
         data: {
           ...book
         },
       })

    return {data:b}
    
    } catch (error) {
    
        throw error
    
    }
     
 
 } 

 export const deleteBook=async ({id,ownerID})=>{
    try {
     const b = await prisma.book.findFirstOrThrow({
        where:{
            id:parseInt(id)
        }
     })

        if(b.ownerID != ownerID)  throw new AppError(401,"you are unauthorized to do this action")

         const book = await prisma.book.delete({
            where:{
            id:parseInt(id)
            }
        })
     
        return {data:book}
   
    } catch (error) {
      throw error
    }
     
 
 } 