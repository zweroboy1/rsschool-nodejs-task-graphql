import { GraphQLList } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { ContextType } from '../types/Context.js';
import { UserType } from '../types/UserType.js';

export const UserQueries = {
  users: {
    type: new GraphQLList(UserType),
    resolve: async (_parent: unknown, _args: unknown, context: ContextType) => {
      const users = await context.prismaClient.user.findMany();
      return users;
    },
  },

  user: {
    type: UserType,
    args: { id: { type: UUIDType } },
    resolve: async (_parent: unknown, args: { id: string }, context: ContextType) => {
      const user = await context.prismaClient.user.findUnique({ where: { id: args.id } });
      return user;
    },
  },
};