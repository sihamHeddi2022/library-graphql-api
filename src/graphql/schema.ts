import { buildSchema } from 'graphql';


const schema = buildSchema(`
    enum Sorting {
        title
        price
        date
    }   
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
        login(user:UserInput):token
        register(user:User):token
        addBook(book:BookInput): BookResponse
        updateBook(id: ID!,book:BookInput): BookResponse
        deleteBook(id: ID!): BookResponse
    }
    
    input SearchQuery {
        limit:Int!
        minPrice:Float
        maxPrice:Float
        category:Category
        title:String
        sortBy:Sorting

    }
 
    input BookInput {
        title: String!
        author: String!
        description: String!
        price:Float!
        image:String!
    }
    
    input User {
       fullName:String!
       email:String!
       password:String!
    }

    input UserInput{
        email:String!
        password:String!
    }
    
    type token {
        token:String!
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
