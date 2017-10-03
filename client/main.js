import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import App from './app/App.jsx';
import ApolloClient from 'apollo-client'; 
import { meteorClientConfig } from 'meteor/apollo'; 
import { ApolloProvider } from 'react-apollo'; 

const client = new ApolloClient(meteorClientConfig());

Meteor.startup(function(){
  render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>, document.getElementById('render-target'));
});
