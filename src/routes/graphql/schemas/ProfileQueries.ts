import { GraphQLList } from 'graphql';

import { ContextType } from '../types/Context.js';
import { UUIDType } from '../types/uuid.js';
import { ProfileType } from '../types/ProfileType.js';

export const ProfileQueries = {
  profiles: {
    type: new GraphQLList(ProfileType),
    resolve: async (_parent: unknown, _args: unknown, context: ContextType) => {
      const profiles = await context.prismaClient.profile.findMany();
      return profiles;
    },
  },

  profile: {
    type: ProfileType,
    args: { id: { type: UUIDType } },
    resolve: async (_parent: unknown, args: { id: string }, context: ContextType) => {
      const profile = await context.prismaClient.profile.findUnique({
        where: { id: args.id },
      });
      return profile;
    },
  },
};