import { ContextType } from '../types/Context.js';
import { UserType } from '../types/UserType.js';

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
};






