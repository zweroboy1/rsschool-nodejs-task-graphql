import { GraphQLObjectType, GraphQLString } from 'graphql';

import { ContextType } from '../types/Context.js';
import { UUIDType } from '../types/uuid.js';
import { UserType } from '../types/UserType.js';

type PostParentType = { authorId: string };

export const PostType: GraphQLObjectType<PostParentType, ContextType> = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: UUIDType },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: { type: UUIDType },

    author: {
      type: UserType,
      resolve: async (
        parent: { authorId: string },
        _args: unknown,
        context: ContextType,
      ) => {
        const postAuthor = await context.prismaClient.user.findUnique({
          where: { id: parent.authorId },
        });
        return postAuthor;
      },
    },
  }),
});