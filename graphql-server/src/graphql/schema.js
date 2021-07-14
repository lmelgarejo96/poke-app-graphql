import { makeExecutableSchema } from "@graphql-tools/schema";
import Types from "./resolvers/Types";
import resolvers from "./resolvers/index";

export default makeExecutableSchema({
    typeDefs: Types,
    resolvers: resolvers
})