import React, {Component} from "react";
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

export class Select_Interest extends React.Component {

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
									<button key={i}>{interest.name}</button>
								)
							})
						}
						</div>
						:null
					}
				</div>
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

// export default compose(
//   graphql(list_interest, {name: 'list_interestQuery'})
//   // graphql(insert_chats_message, {name: 'insert_chat_messageMutation'})
// )(Select_Interest);

export default graphql(list_interest, {name: 'list_interestQuery'})(Select_Interest)