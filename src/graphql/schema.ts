import { buildSchema } from 'graphql';


const schema = buildSchema(`
    enum Category {
        all
        health
        environement
        IT
        novels
    }
    type Query {
        books(s:SearchQuery): [Book]
        book(id: ID!): Book
    }
    
    type Mutation {
        login(user:UserInput):String
        register(user:User):String
        addBook(book:BookInput): BookResponse
        updateBook(id: ID!,book:BookInput): BookResponse
        deleteBook(id: ID!): BookResponse
    }
    
    type SearchQuery {
        limit:Int!
        minPrice:Float
        maxPrice:Float
        category:Category
        title:String

    }
 
    type BookInput {
        title: String!
        author: String!
        description: String!
        price:Float!
        image:String!
    }
    
    type User {
       fullName:String!
       email:String!
       password:String!
    }

    type UserInput{
        email:String!
        password:String!
    }

    

    type Book {
        id: ID!
        title: String!
        author: String!
        description: String!
        price:Float!
        image:String!
    }

    type Books {
        books: [Book]
    }

    type BookResponse {
        data: Book
        error: String
        ok: Boolean
    }
`);

export default schema;
