import * as trpcNext from '@trpc/server/adapters/next';
import { appRouter } from '@test-next-cors/trpc-server';

import Cors from 'cors';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const cors = Cors();

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

function withCors(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    await runMiddleware(req, res, cors);

    return await handler(req, res);
  };
}

// export API handler
// @see https://trpc.io/docs/api-handler
export default withCors(
  trpcNext.createNextApiHandler({
    router: appRouter,
    createContext: () => ({}),
  })
);
