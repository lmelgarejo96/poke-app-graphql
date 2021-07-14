import express from "express";
import fileManager from "./file";
import cors from "cors";
import { graphqlHTTP } from 'express-graphql';
import schema from "./graphql/schema";

const app = express();

// Middlewares
app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use('/api/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));

app.use("/api/uploads", fileManager);


export default app;