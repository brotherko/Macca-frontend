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
			//add a photo to the db
			var icon = 'https://picsum.photos/id/' + this.state.user_id + '/200/200'
      this.props.update_usersMutation({
        variables: {
          id: this.state.user_id,
          icon: icon
        }
      })
			//redirect to interest select
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
			<div className="register content">
				<h1>Your Name?</h1>
				<form onSubmit={this.handleSubmit}>
					<input type="text" value={this.state.name} onChange={this.handleChange}></input>
					<div class="right-wrapper">
						<button class="big-button">Next</button>
					</div>
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
const update_users = gql`
	mutation update_users($icon: String!, $id: Int!){
		update_users(_set: {icon: $icon}, where: {id: {_eq: $id}}) {
		affected_rows
		}
	}
`

export default compose(
  graphql(insert_users, {name: "insert_usersMutation"}),
  graphql(update_users, {name: "update_usersMutation"})
)(New_user)