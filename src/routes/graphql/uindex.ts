import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { graphql } from 'graphql';

import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { rootSchema } from './schemas/RootSchema.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { data } = await graphql({
        schema: rootSchema,
        source: req.body.query,
        variableValues: req.body.variables,
        contextValue: { prismaClient: fastify.prisma },
      });

      return { data };
    },
  });
};
export default plugin;