import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {FormGroup, DropdownButton, MenuItem} from 'react-bootstrap';
export default class SelectInput extends Component{
  constructor(props){
    super(props);
    this.state = {
      value: this.props.value,
    };
  }
  updateValue(key){
    this.setState({
      value: parseInt(key)
    });
    this.props.updateValue("gender", key);
  }
  getName(i){
    if(i === 1){
      return "Mężczyzna";
    }
    return "Kobieta";
  }
  render(){
    return(
      <FormGroup>
        <DropdownButton {...this.props.edited === false ? {disabled : true} : {}} id={this.props.personId} onSelect={(key, e) => this.updateValue(key,e)} title={this.getName(this.state.value)} key={this.state.value} >
           <MenuItem eventKey="1">{this.getName(1)}</MenuItem>
           <MenuItem eventKey="2">{this.getName(2)}</MenuItem>
        </DropdownButton>
      </FormGroup>
    );
  }
}
