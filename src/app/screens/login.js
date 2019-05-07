import React, {Component} from "react";
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import {Link} from 'react-router-dom'

export default class Login extends React.Component{
	render(){
		return(
			<div>
				<h1>Login</h1>
        //////////////////
        login input
        <a href="/new_user">New user</a>
			</div>
		)
	}
}