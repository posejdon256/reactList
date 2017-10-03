import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {Form, Button, FormControl} from 'react-bootstrap';
import {createContainer} from 'meteor/react-meteor-data';
import {Random} from 'meteor/random';
import { graphql } from 'react-apollo'; 
import gql from 'graphql-tag'; 
import Person from './Person.jsx';
import Login from './login/Login.jsx';
import ErrorBoundary from './error/ErrorBoundry.jsx';
import { compose } from 'react-apollo';

function catchError(e){
  console.log('Error with message: ' + e.message + ' was thrown.');
}

class App extends Component{
  constructor(props){
    super(props);
    this.reRenderApp = this.reRenderApp.bind(this);
    this.addPerson = this.addPerson.bind(this);
  }

  checkPerson(person){
    person.selected = !person.selected;
   // Meteor.call("people.update", person, catchError);
  }
  renderPeople(){
    if(Meteor.userId() === null)
      return;
    if (this.props.data.people && this.props.data.people instanceof Array) {
      return this.props.data.people.map((person) => {
        return (
        <ol className="list-item" key={person._id}>
          <FormControl
            ref={person._id} type="checkbox" value={person.selected}
            {...person.userId !== Meteor.userId() ? {disabled : true} : {}}
            placeholder="Wybierz" onChange={() => this.checkPerson(person)}/>
          <Person updatePerson={this.updatePerson} person={person} />
        </ol>);
      });
    }
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
    this.props.insertPerson({variables : {input : newPerson}});
  }
  removePeople(){
    this.props.people.map((person) => {
     //  if(person.selected && person.userId === Meteor.userId())
        //  Meteor.call("people.remove", person._id, catchError);
    });
  }
  updatePerson(person){
 //   Meteor.call("people.update", person, catchError);
  }
  reRenderApp(){
    this.forceUpdate();
  }
  render(){
    return(
      <div>
        <ErrorBoundary>
          <Login updateList={this.reRenderApp} />
          <Form inline>
            <ul>
              {this.renderPeople()}
            </ul>
            <Button onClick={this.addPerson}>
              Dodaj
            </Button>
            <Button onClick={this.removePeople}>
              Usuń
            </Button>
          </Form>
      </ErrorBoundary>
    </div>
    );
  }
}
App.propTypes = { 
     data: PropTypes.shape({ 
         people: PropTypes.array,
     }).isRequired ,
     someName: PropTypes.func.isRequired
 }; 

const getPeople = gql`
  query PeopleForDisplay {
    people {
      _id,
      first_name,
      last_name,
      email,
      gender,
      ip_address,
      selected,
      edited,
      userId
    }
  }
`;
const insertPerson = gql`
  mutation insertPerson($input: PersonInput!){
    insertPerson(input: $input)
  }
`;

export default ComponentWithMutations = compose(
  graphql(insertPerson, { name: 'insertPerson' }),
  graphql(getPeople, {options: {pollInterval: 5000}})
)(App);
