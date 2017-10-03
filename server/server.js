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
    }
}
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

createApolloServer({
    schema
});
