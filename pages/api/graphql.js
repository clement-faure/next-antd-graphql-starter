import { ApolloServer } from 'apollo-server-micro';

import schema from '~/api/schema';

import runMiddleware from '~/api/middlewares/runMiddleware';
import initDb from '~/api/middlewares/initDb';

export const config = {
  api: {
    bodyParser: false,
  },
};

async function handler(req, res) {
  // Run middleware to init database connection
  await runMiddleware(req, res, initDb);

  return new ApolloServer({
    schema,
  }).createHandler({
    path: '/api/graphql',
  })(req, res);
}

export default handler;
