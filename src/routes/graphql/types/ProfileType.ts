import { GraphQLObjectType, GraphQLBoolean, GraphQLInt } from 'graphql';
import { UUIDType } from './uuid.js';
import { ContextType } from '../types/Context.js';
import { MemberType, MemberTypeId } from '../types/MemberType.js';
import { UserType } from './UserType.js';

type ProfileParentType = {
  userId: string;
  memberTypeId: string;
};

export const ProfileType: GraphQLObjectType<ProfileParentType, ContextType> =
  new GraphQLObjectType({
    name: 'Profile',
    fields: () => ({
      id: { type: UUIDType },
      isMale: { type: GraphQLBoolean },
      yearOfBirth: { type: GraphQLInt },
      userId: { type: UUIDType },
      memberTypeId: { type: MemberTypeId },

      user: {
        type: UserType,
        resolve: async (parent, _args: unknown, context) => {
          const profileUser = await context.prismaClient.user.findUnique({
            where: { id: parent.userId },
          });
          return profileUser;
        },
      },

      memberType: {
        type: MemberType,
        resolve: async (parent, _args: unknown, context) => {
          const userMemberType = await context.prismaClient.memberType.findUnique({
            where: { id: parent.memberTypeId },
          });
          return userMemberType;
        },
      },
    }),
  });