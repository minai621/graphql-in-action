/* eslint-disable no-unused-vars */
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  printSchema,
  GraphQLList,
} from 'graphql';
import NumbersInRange from './types/numbers-in-range';
import { numbersInRangeObject } from '../utils';
import Task from './types/task';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    currentTime: {
      type: GraphQLString,
      resolve: () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            const isoString = new Date().toISOString();
            resolve(isoString.slice(11, 19));
          }, 5000);
        });
      },
    },
    numbersInRange: {
      type: NumbersInRange,
      args: {
        begin: { type: new GraphQLNonNull(GraphQLInt) },
        end: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: function (source, { begin, end }) {
        return numbersInRangeObject(begin, end);
      },
    },
    taskMainList: {
      type: new GraphQLList(new GraphQLNonNull(Task)),
      resolve: async (source, args, { pgApi }) => {
        return pgApi.taskMainList();
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: QueryType,
});

console.log(printSchema(schema));
