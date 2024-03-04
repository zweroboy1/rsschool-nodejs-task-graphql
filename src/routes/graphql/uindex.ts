import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { graphql, validate, parse } from 'graphql';
import depthLimit from 'graphql-depth-limit';

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
      const {
        body: { query, variables },
      } = req;

      const validationErrors = validate(rootSchema, parse(query), [
        depthLimit(5),
      ]);

      if (validationErrors.length) {
        return {
          data: {
            message: 'Error in validation',
          },
          errors: validationErrors,
        };
      }

      const { data, errors } = await graphql({
        schema: rootSchema,
        source: query,
        variableValues: variables,
        contextValue: { prismaClient: fastify.prisma },
      });

      return { data, errors };
    },
  });
};
export default plugin;