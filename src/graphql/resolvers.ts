// import { addBook, deleteBook, getBookByID, getbooks, updateBook } from "../model/books";
import { AppError } from "../exception";
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
    const token = await login(input)
    if(token) return {token:token}
  },
   register :  async (input, context) => {

      const token =await register(input)
       return {token:token}
   
  

  },
    // addBook: async (input, context) => {
    //   return await addBook(input)
    // },

    // updateBook:async (input, context) => {
    //   return await updateBook(input)

    // }
    //  ,

    // deleteBook: async ({ id }, context) => {
    //    return await deleteBook(id) 
    // }
};

const resolvers = {
    ...query, ...mutation,
};

export default resolvers