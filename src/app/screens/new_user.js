import React, {Component} from "react";
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

export class New_user extends React.Component{
	state = {
		name: null,
		user_id: null
	}
	
	handleSubmit = (e) => {
		const {cookies} = this.props
		console.log(this.state.name)
		e.preventDefault();
		//insert the name
		this.props.insert_usersMutation({
			variables: {
				name: this.state.name
			}
		}).then(res =>{
			var tmp = res.data.insert_users.returning[0].id
			this.setState({
				user_id: tmp
			})
			document.cookie = "user_id=" + this.state.user_id 
			this.props.history.push("/interest")
		})
		//get the user_id (done above)
		
		//put in the cookie/place for holding the id
		// go to the interest
		
	}

	handleChange = (e) => {
		this.setState({
			name: e.target.value
		})
	}

	render(){
		console.log(this.props)
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

const insert_users = gql`
	mutation insert_users($name: String!){
		insert_users(objects: {name: $name}) {
			returning {
				id
				name
			}
		}
	}
`

export default graphql(insert_users, {name: "insert_usersMutation"})(New_user)