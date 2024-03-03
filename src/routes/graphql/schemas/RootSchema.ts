import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import { UserQueries } from './UserQueries.js';
import { ProfileQueries } from './ProfileQueries.js';
import { PostQueries } from './PostQueries.js';
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
});