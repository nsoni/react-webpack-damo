import React, { Component, PropTypes } from 'react';
import {SyntexChecker} from 'components';
import {checkBalance} from 'config/helperFunction'

export default class SyntexCheckerContainer extends Component {
    constructor(props) {
      super(props);

      this.state = {
        inputValue: "",
        resultMessage: "",
        errorIndex: "",
    	}
    }

    handleInputChange = (event) => {
    	let value = event.target.value;
    	this.setState({inputValue: value})
    }

    handleSyntexChecker = () => {
    	let value = this.state.inputValue
    	if(value){
	    	let result = checkBalance(value)
	    	console.log(result, value.substring(0, result.index))
	    	if(result.result){
	    		this.setState({resultMessage: "WooHoo! Your code is Balanced! :)", errorIndex: ""})
	    	}else{
	    		this.setState({resultMessage: value.substring(0, result.index), errorIndex: result.index})
	    	}
    	}
    	else{
	    		this.setState({resultMessage: "Cool! Nothing to check. ", errorIndex: ""})
	    	}
    }

    inputKeyPress = (event) => {
    	let e = event.which
    	if(e == 13){
    		this.handleSyntexChecker()
    	}
    	else if(e == 27){
    		this.setState({inputValue: ""})
    	}
    }	

    render() {
        return (
            <SyntexChecker 
            	inputKeyPress = {this.inputKeyPress}
            	errorIndex = {this.state.errorIndex}
            	inputValue = {this.state.inputValue}
            	handleInputChange = {this.handleInputChange}
            	handleSyntexChecker = {this.handleSyntexChecker}
            	resultMessage = {this.state.resultMessage}
            />
        );
    }
}
