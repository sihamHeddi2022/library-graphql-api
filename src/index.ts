import express from 'express';

import cors from 'cors'
import dotenv from "dotenv"

import schema from './graphql/schema'
import resolvers from './graphql/resolvers'


import { graphqlHTTP } from 'express-graphql';
import { verifyToken } from './middlware/auth';

const app = express();

app.use(verifyToken)
app.use(cors())
app.use(
    "/api/graphql/",
    graphqlHTTP((request, response, graphQLParams) => ({
        schema,
        rootValue: resolvers,
        graphiql: true,
        context: { request },
        customFormatErrorFn: (err) => {
         console.log(err);
         
          return err
        }
    }))
);


dotenv.config()



const port = process.env.PORT;

app.use(cors())




app.listen(port, () => {
  console.log(`Timezones by location application is running on port ${port}.`);
});