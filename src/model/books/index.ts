import prisma from ".."
import { AppError } from "../../exception";



export const getbooks=async (input)=>{
  console.log("bn ","length");

    try {
      const query:any = {}
      
      if(input.minPrice && input.maxPrice){
        query.price = {
          gte:parseFloat(input.minPrice),
          lte:parseFloat(input.maxPrice)
        }
      } 

      if (input.title) {
        query.title = {contains:input.title, mode: 'insensitive'}
      }

      if(input.category!="all") query.category = input.category
      
   
      
      const req:any = {}

      req.take = input.limit
      
      if (input.page>1) req.skip = input.limit*(input.page-1) 
      req.orderBy = {
        [input.sortBy]:"desc"
      }
      req.where = query
      console.log("hello ",req.where);
      
      
      const length = await (await prisma.book.findMany({where:req.where})).length
      
      const pages:number = Math.ceil(length/input.limit) 
      
      const books = await prisma.book.findMany({...req})
       
      return {books,pages}
    
    } catch (error) {
      console.log(error);
      
      throw error
    }

 }
 
 
 export const getpopularBooks = async()=>{
  try {
    const books:any = await prisma.book.findMany({
       orderBy:{
         createdAt:"desc"
       },
      include:{
          orders:true
      }
     })

     return books.filter(book=>book.orders.length>=2).slice(0,3)
  } catch (error) {
    console.log(error);
    throw error
  }
 }

export const getBookByUserID=async (id)=>{

    try {
        const book = await prisma.book.findMany({where:{ ownerID: parseInt(id)}})
       return book
       } catch (error) {
         throw error
       }

}

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