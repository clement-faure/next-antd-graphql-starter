import { ApolloServer } from 'apollo-server-micro';
import Cors from 'cors';

import typeDefs from '~/api/type-defs';
import resolvers from '~/api/resolvers';

import runMiddleware from '~/api/middlewares/runMiddleware';
import initDb from '~/api/middlewares/initDb';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Initializing the cors middleware
const cors = Cors({
  methods: ['POST', 'OPTIONS'], // Allow only post and options methods
});

async function handler(req, res) {
  // Run the middleware to init cors
  await runMiddleware(req, res, cors);

  // Run middleware to init database connection
  await runMiddleware(req, res, initDb);

  return new ApolloServer({
    typeDefs,
    resolvers,
  }).createHandler({
    path: '/api/graphql',
  })(req, res);
}

export default handler;
