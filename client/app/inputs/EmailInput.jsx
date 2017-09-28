import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {FormGroup, FormControl} from 'react-bootstrap';
export default class EmailInput extends Component{
  constructor(props){
    super(props);
    this.state = {
      value: this.props.value,
    };
  }
  updateValue(){
    let newValue = ReactDOM.findDOMNode(this.refs.value).value;
    this.props.updateValue(this.props.name, newValue);
    this.setState({
      value: newValue
    });
  }
  render(){
    return(
      <FormGroup validationState={this.props.getValidationState(this.state.value)}>
        <FormControl {...this.props.edited === false ? {disabled : true} : {}} ref="value" type="email" value={this.state.value}
           placeholder={this.props.description} onChange={() => this.updateValue()}/>
      </FormGroup>
    );
  }
}
