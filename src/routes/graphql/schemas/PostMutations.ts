import { ContextType } from '../types/Context.js';
import { PostType } from '../types/PostType.js';
import { CreatePostInputType } from '../types/types.js';

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
};