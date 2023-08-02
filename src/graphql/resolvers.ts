import { addBook, deleteBook, getBookByID, getbooks, updateBook } from "../model/books";



const query = {
    books: async ({limit}, context) => {
       return await getbooks(limit)
    },
    book: async ({id}, context) => {
        console.log(typeof id);

        return await getBookByID(id)     
    }
};



const mutation = {
    addBook: async (input, context) => {
      return await addBook(input)
    },

    updateBook:async (input, context) => {
      return await updateBook(input)

    }
     ,

    deleteBook: async ({ id }, context) => {
       return await deleteBook(id) 
    }
};

const resolvers = {
    ...query, ...mutation,
};

export default resolvers