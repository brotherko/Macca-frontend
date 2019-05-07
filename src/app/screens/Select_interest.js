import React, {Component} from "react";
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

export class Select_Interest extends React.Component {
	state = {
		interest: []
	}
	add_scale = (id) => {
		console.log(id)
		var tmp = this.state.interest
		if(this.state.interest[id]){
			if(tmp[id] < 5){
				var newScale = this.state.interest[id]
				newScale++
				tmp[id] = newScale
			}
		}else{
			tmp[id] = 1
		}
		this.setState({
			interest: tmp
		})
		console.log(this.state.interest)
	}
	render() {
		console.log(this.props);
		return(
			<div>
				<h1>Select your interest</h1>
				<div className="interest_field">
					{this.props.list_interestQuery.list_interests
						?<div>
							{this.props.list_interestQuery.list_interests.map((interest, i) => {
								return(
									<button key={i} onClick={this.add_scale.bind(this, interest.id)}>{interest.name}</button>
								)
							})
						}
						</div>
						:null
					}
				</div>
				<br></br>
				<button>Continue</button>
			</div>
		)
	}
}

const list_interest = gql`
	query list_interests{
		list_interests {
			id
			name
		}
	}
`

export default compose(
  graphql(list_interest, {name: 'list_interestQuery'})
  // graphql(insert_chats_message, {name: 'insert_chat_messageMutation'})
)(Select_Interest);

// export default graphql(list_interest, {name: 'list_interestQuery'})(Select_Interest)