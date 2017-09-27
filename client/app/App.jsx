import React, {Component, PropTypes} from 'react';
import {Form, Button} from 'react-bootstrap';
import {createContainer} from 'meteor/react-meteor-data';
import {People} from '../../imports/api/people.js';
import {Random} from 'meteor/random';
import Person from './Person.jsx'

class App extends Component{
  constructor(props){
    super(props);
  }
  renderPeople(){
    return this.props.people.map((person) => {
       return (<Person updatePerson={this.updatePerson} key={person._id} person={person} />);
    });
  }
  addPerson(){
    let newPerson = {
      _id: Random.id(),
      selected: false,
      edited: true,
      first_name: "Jan",
      last_name: "Kowalski",
      email: "",
      gender: 0,
      ip_address: ""
    }
    Meteor.call("people.insert", newPerson);
  }
  removePeople(){
    this.props.people.map((person) => {
       if(person.selected)
          Meteor.call("people.remove", person._id);
    });
  }
  updatePerson(person){
    Meteor.call("people.update", person);
  }
  render(){
    return(
      <div>
        <Form inline>
          <ul>
            {this.renderPeople()}
          </ul>
          <Button onClick={() => this.addPerson()}>
            Add
          </Button>
          <Button onClick={() => this.removePeople()}>
            Remove
          </Button>
        </Form>
    </div>
    );
  }
}
export default createContainer(() => {
  Meteor.subscribe("people");
  return {
    people: People.find({}, {}).fetch()
  };
}, App);
