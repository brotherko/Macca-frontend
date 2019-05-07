import React, {Component} from "react";
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

export class Select_Interest extends React.Component {
	state = {
		interest: [],
		user: null
  }
  componentDidMount(){
    this.setState({
      user: this.getCookie('user_id')
    })
  }
  getCookie = (cname) => {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

	add_scale = (id) => {
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

	next_stage = () => {
		const {history} = this.props
		const {interest} = this.state
		console.log("welcome")
		//mutation the state to user_interest
		for(var i = 0; i < interest.length; i++){
			if(interest[i] > 0){
				console.log(i+ ' : ' + interest[i])
				this.props.insert_users_interestsMutation({
					variables: {
						interest_id: i,
						score: interest[i],
						user_id: this.state.user
					}
				})
			}
		}
		history.push("/lang")
	}

	render() {
    // console.log(this.props);
    console.log(document.cookie)
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
				<button onClick={this.next_stage}>Continue</button>
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

const insert_users_interests = gql`
	mutation insert_users_interests($interest_id: Int!, $score: Int!, $user_id: Int!) {
		insert_users_interests(objects: {interest_id: $interest_id, score: $score, user_id: $user_id}) {
			returning {
				id
				interest_id
				user_id
				name {
					name
				}
				score
			}
		}
	}
`

export default compose(
  graphql(list_interest, {name: 'list_interestQuery'}),
  graphql(insert_users_interests, {name: 'insert_users_interestsMutation'})
)(Select_Interest);

// export default graphql(list_interest, {name: 'list_interestQuery'})(Select_Interest)