// import { addBook, deleteBook, getBookByID, getbooks, updateBook } from "../model/books";
import { AppError } from "../exception";
import { addBook, deleteBook, updateBook } from "../model/books";
import { login, register } from "../model/users";



const query = {
    // books: async ({limit}, context) => {
    //    return await getbooks(limit)
    // },
    // book: async ({id}, context) => {
    //     console.log(typeof id);

    //     return await getBookByID(id)     
    // }
};



const mutation = {
  login :  async (input, context) => {
    const token = await login(input.user)
    return {token:token}
  },
   register :  async (input, context) => {

      const token =await register(input.user)
       return {token:token}
   
  

  },
    addBook: async (input, context) => {
      try {
       console.log("azaa");
       
       if(!context.request.isAuth) throw new AppError(context.request.err.status,context.request.err.message)
       return await addBook({...input.book,ownerID:context.request.user})

        
      } catch (error) {
        console.log("ddsd ",error);
        
       throw error 
      }
   
   },

    updateBook:async (input, context) => {
      try {

        if(!context.request.isAuth) throw new AppError(context.request.err.status,context.request.err.message)
        return await updateBook({book:{...input.book},ownerID:context.request.user,id:input.id})
 
         
       } catch (error) {
         console.log(error);
         
        throw error 
       }
    

    }
     ,

    deleteBook: async ({ id }, context) => {
      try {
        if(!context.request.isAuth) throw new AppError(context.request.err.status,context.request.err.message)

        return await deleteBook({id,ownerID:context.request.user}) 
 
         
       } catch (error) {
         console.log(error);
         
        throw error 
       }
    

    }
  
};

const resolvers = {
    ...query, ...mutation,
};

export default resolvers