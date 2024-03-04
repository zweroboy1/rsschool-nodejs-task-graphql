import { GraphQLList } from 'graphql';

import { ContextType } from '../types/Context.js';
import { UUIDType } from '../types/uuid.js';
import { PostType } from '../types/PostType.js';

export const PostQueries = {
  posts: {
    type: new GraphQLList(PostType),
    resolve: async (_parent: unknown, _args: unknown, context: ContextType) => {
      const posts = await context.prismaClient.post.findMany();
      return posts;
    },
  },

  post: {
    type: PostType,
    args: { id: { type: UUIDType } },
    resolve: async (_parent: unknown, args: { id: string }, context: ContextType) => {
      const post = await context.prismaClient.post.findUnique({ where: { id: args.id } });
      return post;
    },
  },
};