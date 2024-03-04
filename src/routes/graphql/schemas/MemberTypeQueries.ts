import { GraphQLList } from 'graphql';
import { ContextType } from '../types/Context.js'
import { MemberType, MemberTypeId } from '../types/MemberType.js';

export const MemberTypeQueries = {
  memberTypes: {
    type: new GraphQLList(MemberType),
    resolve: async (_parent: unknown, _args: unknown, context: ContextType) => {
      const memberTypes = await context.prismaClient.memberType.findMany();
      return memberTypes;
    },
  },

  memberType: {
    type: MemberType,
    args: { id: { type: MemberTypeId } },
    resolve: async (_parent: unknown, args: { id: string }, context: ContextType) => {
      const memberType = await context.prismaClient.memberType.findUnique({
        where: { id: args.id },
      });
      return memberType;
    },
  },
};