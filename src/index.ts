import express from 'express';

import cors from 'cors'
import dotenv from "dotenv"

import schema from './graphql/schema'
import resolvers from './graphql/resolvers'


import { graphqlHTTP } from 'express-graphql';

const app = express();


app.use(
    "/api/graphql/",
    graphqlHTTP((request, response, graphQLParams) => ({
        schema,
        rootValue: resolvers,
        graphiql: true
    }))
);


dotenv.config()



const port = process.env.PORT;

app.use(cors())




app.listen(port, () => {
  console.log(`Timezones by location application is running on port ${port}.`);
});