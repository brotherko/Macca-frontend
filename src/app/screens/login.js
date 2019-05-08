import React, {Component} from "react";
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import {Link} from 'react-router-dom'

export default class Login extends React.Component{
	render(){
		return(
			<div className="home center">
				<h1>MACCA</h1>
				<h2>Social Networking & Language Exchange</h2>
				<Link to="/new_user" className="big-button">Register</Link>
			</div>
		)
	}
}