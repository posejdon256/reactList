import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {FormControl, DropdownButton, MenuItem, Button, FormGroup} from 'react-bootstrap';

export default class Person extends Component{
  constructor(props){
    super(props);
    this.state = {
      first_name: this.props.person.first_name,
      last_name: this.props.person.last_name,
      email: this.props.person.email,
      gender: this.props.person.gender,
      ip_address: this.props.person.ip_address,
      editedText: this.props.person.edited ? 'Zakończ edycje' : 'Edytuj',
      selected: this.props.person.selected,
      edited: this.props.person.edited
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(key,event){
    this.setState({
      first_name: ReactDOM.findDOMNode(this.refs.first_name).value,
      last_name: ReactDOM.findDOMNode(this.refs.last_name).value,
      email: ReactDOM.findDOMNode(this.refs.email).value,
      gender: key !== undefined ? parseInt(key) : this.state.gender,
      ip_address: ReactDOM.findDOMNode(this.refs.ip_address).value,
      selected:ReactDOM.findDOMNode(this.refs.selected).checked,
    })
  }
  getName(i){
    if(i === 1){
      return "Mężczyzna";
    }
    return "Kobieta";
  }
  finishEdition(){
    let item = {
      _id: this.props.person._id,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      gender: this.state.gender,
      ip_address: this.state.ip_address,
      selected: this.state.selected,
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
      <ol>
          <FormControl ref="selected" type="checkbox" value={this.state.selected} placeholder="Wybierz" onChange={() => this.handleChange()}/>
          <FormControl {...this.state.edited === false ? {disabled : 'true'} : {}} ref="first_name" type="text" value={this.state.first_name} placeholder="Imie" onChange={() => this.handleChange()}/>
          <FormControl {...this.state.edited === false ? {disabled : 'true'} : {}}  ref="last_name" type="text" value={this.state.last_name} placeholder="Nazwisko" onChange={() => this.handleChange()}/>
          <FormControl {...this.state.edited === false ? {disabled : 'true'} : {}}  ref="email" type="email" value={this.state.email} placeholder="Email" onChange={() => this.handleChange()}/>
          <DropdownButton {...this.state.edited === false ? {disabled : 'true'} : {}} id={this.props.person._id} onSelect={(key, e) => this.handleChange(key,e)} title={this.getName(this.state.gender)} key={this.state.gender} >
             <MenuItem eventKey="1">{this.getName(1)}</MenuItem>
             <MenuItem eventKey="2">{this.getName(2)}</MenuItem>
          </DropdownButton>
          <FormControl {...this.state.edited === false ? {disabled : 'true'} : {}}  ref="ip_address" type="text" value={this.state.ip_address} placeholder="Adres IP" onChange={() => this.handleChange()}/>
          <Button onClick={() => this.finishEdition()}>{this.state.editedText}</Button>
      </ol>
    );
  }
}
