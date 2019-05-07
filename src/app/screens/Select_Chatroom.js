import React, {Component} from "react";
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag'

export class Select_Chatroom extends React.Component{
	constructor(props){
		super(props)
	}
	goto_chatroom = (chat_id) => {
		console.log(chat_id)
		this.props.history.push({
			pathname: '/chatroom',
			state: { chat_id: chat_id}
		})
	}

	render() {
		const {chats_members} = this.props.get_chatroomQuery;
		console.log(this.props)
		return(
			<div>
				<h1>Select Chatrooms</h1>
				{chats_members
					?<div>
						{
							chats_members.map((chatroom, i) => {
								return(
									<div>
										<a key={i} onClick={this.goto_chatroom.bind(this, chatroom.chat_id)}>{chatroom.chat_id}</a>
									</div>
								)
							})
						}
					</div>
					:null
				}
			</div>
		)
	}
}

const get_chatroom = gql`
	query chats_members($user_id: Int!){
		chats_members(where: {user_id: {_eq: $user_id}}) {
			chat_id
		}
	}
`
const getCookie = (cname) => {
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

export default graphql(get_chatroom, {
	name: "get_chatroomQuery",
	options: () => {
		console.log(getCookie("user_id"))
		return{
			variables: {
				user_id: getCookie("user_id")
			}
		}
	}
})(Select_Chatroom)