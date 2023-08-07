import { buildSchema } from 'graphql';


const schema = buildSchema(`
enum Sorting {
    title
    price
    createdAt
}   

enum Category {
    all
    health
    environment
    IT
    novels
}

type Query {
    books(s: SearchQuery):Result
    booksOfUser: [Book]
    popularBooks:[Book]
    getOrdersOfUser: [Orders]
}

type Mutation {
    updateStatusOrder(id: ID!, status: Boolean): String
    createOrder(c: ClientInput, o: OrderInput): String
    login(user: UserInput): Token
    register(user: User): Token
    addBook(book: BookInput): BookResponse
    updateBook(id: ID!, book: BookInput): BookResponse
    deleteBook(id: ID!): BookResponse
}

type Orders {
    book: Book!
    quantity: Int!
    client:Client
    id:ID!
    status:Boolean!
    createdAt:Int!
}

type Result {
    books:[Book]!,
    pages:Int!
}
input OrderInput {
    orders: [Order]
}

input Order {
    bookID: Int!
    quantity: Int!
}

type Client {
    email: String!
    FirstName: String!
    LastName: String!
    Country: String!
    Street: String!
    City: String!
    State: String!
    ZIP: Int!
}

input ClientInput {
    email: String!
    FirstName: String!
    LastName: String!
    Country: String!
    Street: String!
    City: String!
    State: String!
    ZIP: Int!
}

input SearchQuery {
    limit: Int!
    minPrice: Float
    maxPrice: Float
    category: Category
    title: String
    sortBy: Sorting
    page: Int!
}

input BookInput {
    title: String!
    author: String!
    description: String!
    price: Float!
    image: String!
    stock: Int!
    category:Category!
}

input User {
    fullName: String!
    email: String!
    password: String!
}

input UserInput {
    email: String!
    password: String!
}

type Token {
    token: String!
}

type Book {
    id: ID!
    title: String!
    author: String!
    description: String!
    price: Float!
    image: String!
    ownerID: Int
    stock: Int
    category:Category
}

type Books {
    books: [Book]
}

type BookResponse {
    data: Book
}

`);

export default schema;
