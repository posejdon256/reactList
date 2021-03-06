import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Template} from 'meteor/templating';
import {Blaze} from 'meteor/blaze';

export default class Login extends Component {
  constructor(props){
    super(props);
    let that = this;
    Tracker.autorun(function(){
      if(Meteor.userId()){
        that.props.updateList();
      }
      else{
        that.props.updateList();
      }
    }, this.catchError);
  }
  componentDidMount(){
    this.view = Blaze.render(Template.loginButtons, ReactDOM.findDOMNode(this.refs.container));
  }
  componentWillUnmount(){
    Blaze.remove(this.view);
  }
  render(){
    return <span ref="container"></span>;
  }

}
