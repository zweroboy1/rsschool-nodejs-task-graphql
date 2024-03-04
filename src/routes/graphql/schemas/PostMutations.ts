import { GraphQLBoolean } from 'graphql';
import { ContextType } from '../types/Context.js';
import { PostType } from '../types/PostType.js';
import { CreatePostInputType } from '../types/types.js';
import { UUIDType } from '../types/uuid.js';

type MutationsPostDtoType = {
  authorId: string;
  content: string;
  title: string;
};

export const PostMutations = {
  createPost: {
    type: PostType,
    args: { dto: { type: CreatePostInputType } },
    resolve: async (
      _parent: unknown,
      args: { dto: MutationsPostDtoType },
      context: ContextType,
    ) => {
      const post = await context.prismaClient.post.create({ data: args.dto });
      return post;
    },
  },
  deletePost: {
    type: GraphQLBoolean,
    args: { id: { type: UUIDType } },
    resolve: async (_parent: unknown, args: { id: string }, context: ContextType) => {
      try {
        await context.prismaClient.post.delete({ where: { id: args.id } });
        return true;
      } catch (err) {
        return false;
      }
    },
  },

};