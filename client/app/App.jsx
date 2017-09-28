import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Form, Button, FormControl} from 'react-bootstrap';
import {createContainer} from 'meteor/react-meteor-data';
import {People} from '../../imports/api/people.js';
import {Random} from 'meteor/random';
import Person from './Person.jsx';
import Login from './login/Login.jsx';

class App extends Component{
  constructor(props){
    super(props);
  }
  checkPerson(person){
    if(person.userId !== Meteor.userId()){
      let _id = person._id;
      ReactDOM.findDOMNode(this.refs[_id]).checked = false;
      return;
    }
    person.selected = !person.selected;
    Meteor.call("people.update", person);
  }
  renderPeople(){
    return this.props.people.map((person) => {
       return (
      <ol className="list-item" key={person._id}>
        <FormControl
          ref={person._id} type="checkbox" value={person.selected}
          placeholder="Wybierz" onChange={() => this.checkPerson(person)}/>
        <Person updatePerson={this.updatePerson} person={person} />
       </ol>);
    });
  }
  addPerson(){
    let newPerson = {
      _id: Random.id(),
      selected: false,
      edited: true,
      first_name: "Jan",
      last_name: "Kowalski",
      email: "example@example.pl",
      gender: 1,
      ip_address: "111.111.111.111",
      userId: Meteor.userId()
    }
    Meteor.call("people.insert", newPerson);
  }
  removePeople(){
    this.props.people.map((person) => {
       if(person.selected && person.userId === Meteor.userId())
          Meteor.call("people.remove", person._id);
    });
  }
  updatePerson(person){
    Meteor.call("people.update", person);
  }
  render(){
    return(
      <div>
        <Login updateComponent={this.reRenderApp} />
        <Form inline>
          <ul>
            {this.renderPeople()}
          </ul>
          <Button onClick={() => this.addPerson()}>
            Dodaj
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
