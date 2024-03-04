import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import { UserQueries } from './UserQueries.js';
import { UserMutations } from './UserMutations.js';
import { ProfileQueries } from './ProfileQueries.js';
import { ProfileMutations } from './ProfileMutations.js';
import { PostQueries } from './PostQueries.js';
import { PostMutations } from './PostMutations.js';
import { MemberTypeQueries } from './MemberTypeQueries.js';

export const rootSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
      ...UserQueries,
      ...ProfileQueries,
      ...PostQueries,
      ...MemberTypeQueries,
    }),
  }),
  mutation: new GraphQLObjectType({
    name: 'RootMutationType',
    fields: () => ({
      ...UserMutations,
      ...ProfileMutations,
      ...PostMutations,
    }),
  }),
});