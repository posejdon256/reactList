import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'react-bootstrap';
import TextInput from './inputs/TextInput.jsx';
import SelectInput from './inputs/SelectInput.jsx';
import EmailInput from './inputs/EmailInput.jsx';
import {check} from 'meteor/check';

export default class Person extends Component{
  constructor(props){
    super(props);
    this.notEmpty = this.notEmpty.bind(this);
    this.emailValidation = this.emailValidation.bind(this);
    this.validIP = this.validIP.bind(this);
    this.finishEdition = this.finishEdition.bind(this);

    this.state = {
      first_name: this.props.person.first_name,
      last_name: this.props.person.last_name,
      email: this.props.person.email,
      gender: this.props.person.gender,
      ip_address: this.props.person.ip_address,
      editedText: this.props.person.edited ? 'Zakończ edycje' : 'Edytuj',
      edited: this.props.person.edited
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(name, value){
    let stateObject = {};
    stateObject[name] = value;
    this.setState(stateObject);
  }
  updateError(_error){
    let ret = 'error';
    if(!_error)
      ret = 'success';
    return ret;
  }
  notEmpty(name, text){
    let _error = true;
    if(text !== undefined && text.length > 0)
      _error = false;

    return this.updateError(_error, name);
  }
  emailValidation(email){
    let _error = true;
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(email))
      _error = false;
    return this.updateError(_error);
  }
  validIP(name,text){
    let _error = true;
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(text))
      _error = false;
    return this.updateError(_error);
  }
  isFormValid(){
    if(this.validIP('ip_address',this.state.ip_address) !== 'success'
      || this.emailValidation(this.state.email) !== 'success'
      || this.notEmpty('first_name', this.state.first_name) !== 'success'
      || this.notEmpty('last_name', this.state.last_name) !== 'success' ){
        this.setState({error: true});
        return false;
      }
      return true;
  }
  finishEdition(event){
    if(!this.isFormValid())
      return;
    this.setState({error: false});
    let item = {
      _id: this.props.person._id,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      gender: this.state.gender,
      ip_address: this.state.ip_address,
      selected: this.props.person.selected,
      edited: !this.state.edited
    };
    this.setState({
      edited: !this.state.edited,
      editedText: this.state.edited ? 'Edytuj' : 'Zakończ edycję'
    });
    this.props.updatePerson(item);
  }
  render(){
    return(
      <div>
          <TextInput name={"first_name"} edited={this.state.edited} value={this.state.first_name}
             description={"Imie"} updateValue={this.handleChange} getValidationState={this.notEmpty} />
          <TextInput name={"last_name"} edited={this.state.edited} value={this.state.last_name}
             description={"Nazwisko"} updateValue={this.handleChange} getValidationState={this.notEmpty} />
           <EmailInput name={"email"} edited={this.state.edited} value={this.state.email} getValidationState={this.emailValidation}
          description={"Email"} updateValue={this.handleChange}/>
         <SelectInput personId={this.props.person._id} edited={this.state.edited} value={this.state.gender} updateValue={this.handleChange} />
          <TextInput name={"ip_address"} edited={this.state.edited} value={this.state.ip_address}
             description={"Adres IP"} updateValue={this.handleChange} getValidationState={this.validIP} />
           <Button onClick={this.finishEdition}>{this.state.editedText}</Button>
      </div>
    );
  }
}
