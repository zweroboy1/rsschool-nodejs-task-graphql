import { ContextType } from '../types/Context.js';
import { CreateProfileInputType } from '../types/types.js';
import { ProfileType } from '../types/ProfileType.js';

type MutationsProfileDtoType = {
  isMale: boolean;
  yearOfBirth: number;
  userId: string;
  memberTypeId: string;
};

export const ProfileMutations = {
  createProfile: {
    type: ProfileType,
    args: { dto: { type: CreateProfileInputType } },
    resolve: async (
      _parent: unknown,
      args: { dto: MutationsProfileDtoType },
      context: ContextType,
    ) => {
      const profile = await context.prismaClient.profile.create({ data: args.dto });
      return profile;
    },
  },
};
