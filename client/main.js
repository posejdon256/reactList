import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import App from './app/App.jsx';

Meteor.startup(function(){
  render(<App />, document.getElementById('render-target'));
});
