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

    this.state = {
      first_name: this.props.person.first_name,
      last_name: this.props.person.last_name,
      email: this.props.person.email,
      gender: this.props.person.gender,
      ip_address: this.props.person.ip_address,
      editedText: this.props.person.edited ? 'Zakończ edycje' : 'Edytuj',
      edited: this.props.person.edited,
      hasError: false
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidCatch(error, info){
    this.setState({hasError : true});
    console.log(error);
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
             description={"Imie"} updateValue={(n, v) => this.handleChange(n, v)} getValidationState={(n, v) => this.notEmpty(n, v)} />
          <TextInput name={"last_name"} edited={this.state.edited} value={this.state.last_name}
             description={"Nazwisko"} updateValue={(n, v) => this.handleChange(n, v)} getValidationState={(n, v) => this.notEmpty(n, v)} />
           <EmailInput name={"email"} edited={this.state.edited} value={this.state.email} getValidationState={(v) => this.emailValidation(v)}
          description={"Email"} updateValue={(n, v) => this.handleChange(n, v)}/>
         <SelectInput personId={this.props.person._id} edited={this.state.edited} value={this.state.gender} updateValue={(n, v) => this.handleChange(n, v)} />
          <TextInput name={"ip_address"} edited={this.state.edited} value={this.state.ip_address}
             description={"Adres IP"} updateValue={(n, v) => this.handleChange(n, v)} getValidationState={(n, v) => this.validIP(n, v)} />
           <Button onClick={(e) => this.finishEdition(e)}>{this.state.editedText}</Button>
      </div>
    );
  }
}
