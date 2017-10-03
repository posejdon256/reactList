import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from '../imports/api/schema.js';
import {Meteor} from 'meteor/meteor';
import {People}  from '../imports/api/people.js';


const prepare = (o) => {
    o._id = o._id.toString();
    return o;
}
const resolvers = {
    Query: {
        people: function(){ 
            return (People.find({}).fetch());
        }
    },
    Mutation: {
        insertPerson: (root, args) => {
            People.insert({
                _id: args.input._id,
                first_name: args.input.first_name,
                last_name: args.input.last_name,
                email: args.input.email,
                gender: args.input.gender,
                ip_address: args.input.ip_address,
                selected: args.input.selected,
                edited: args.input.edited,
                userId: args.input.userId
              });
              return "";
        },
        insertTest: (root, args) => {
            return args.message;
        }
    }
}
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

createApolloServer({
    schema
});
