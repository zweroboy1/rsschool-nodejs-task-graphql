import { GraphQLBoolean } from 'graphql';
import { ContextType } from '../types/Context.js';
import { UserType } from '../types/UserType.js';
import { UUIDType } from '../types/uuid.js';

import { CreateUserInputType } from '../types/types.js';

type MutationsUserDtoType = {
  name: string;
  balance: number;
};

export const UserMutations = {
  createUser: {
    type: UserType,
    args: { dto: { type: CreateUserInputType } },
    resolve: async (
      _parent: unknown,
      args: { dto: MutationsUserDtoType },
      context: ContextType,
    ) => {
      const user = await context.prismaClient.user.create({ data: args.dto });
      return user;
    },
  },

  deleteUser: {
    type: GraphQLBoolean,
    args: { id: { type: UUIDType } },
    resolve: async (_parent: unknown, args: { id: string }, context: ContextType) => {
      try {
        await context.prismaClient.user.delete({ where: { id: args.id } });
        return true;
      } catch {
        return false;
      }
    },
  },
};






