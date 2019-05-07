import React, {Component} from "react";
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

export default class New_user extends React.Component{
	state = {
		name: null
	}
	
	handleSubmit = (e) => {
		console.log(this.state.name)
		e.preventDefault();
	}

	handleChange = (e) => {
		this.setState({
			name: e.target.value
		})
	}

	render(){
		return(
			<div>
				<h1>New Name</h1>
				<form onSubmit={this.handleSubmit}>
					<label>Your Name</label>
					<input type="text" value={this.state.name} onChange={this.handleChange}></input>
					<input type="submit" value="Submit"/>
				</form>
			</div>
		)
	}
}