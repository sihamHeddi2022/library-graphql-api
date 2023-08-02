import prisma from ".."

type BookInput={
  id:number | undefined;
  title:string;author:string;description:string;price:number;image:string;
}
export const getbooks=async (limit:number)=>{
    
    try {
     const books = await prisma.book.findMany({take:limit})
    return books
    } catch (error) {
      throw error
    }

 }
 
 

export const getBookByID=async (id)=>{

    try {

        
        const book = await prisma.book.findUnique({where:{ id: parseInt(id)}})
       return book
       } catch (error) {
         throw error
       }

}

export const addBook=async (input:BookInput)=>{
   try {
   
    const book = await prisma.book.create({
        data: {
         ...input
        },
      })
   if(book) return book
   } catch (error) {
     throw error
   }
    

} 

export const updateBook=async (input:BookInput)=>{
    try {
      const id = input.id as number
     const book = await prisma.book.update({
        where:{
          id
        },
         data: {
           ...input
         },
       })
    return book
    } catch (error) {
      throw error
    }
     
 
 } 

 export const deleteBook=async (id:number)=>{
    try {
     const book = await prisma.book.delete({
        where:{
          id
        }
       })
    return book
    } catch (error) {
      throw error
    }
     
 
 } 