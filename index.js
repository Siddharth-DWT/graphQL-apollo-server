import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';
import dotenv from "dotenv";
import cors from "cors";

import typeDefs from './src/graphQL/typeDefs/schema.js';
import resolvers from './src/graphQL/resolvers/resolver.js';
dotenv.config();


async function startApolloServer(typeDefs, resolvers) {
    // Required logic for integrating with Express
    const app = express();
    app.use(cors());
    app.disable("x-powered-by");
    const httpServer = http.createServer(app);

    // Same ApolloServer initialization as before, plus the drain plugin.
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    // More required logic for integrating with Express
    await server.start();
    server.applyMiddleware({
        app,
        path: '/',
    });

    // Modified server startup
    await new Promise(resolve => httpServer.listen({ port: process.env.PORT || 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);