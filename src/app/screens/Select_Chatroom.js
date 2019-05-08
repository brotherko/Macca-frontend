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
	find_new_chatroom = () => {
		this.props.changeSearch()
		this.props.history.push('/loading')
	}
	

	render() {
		const { chats } = this.props.get_chatroomQuery;
		console.log('dllm', chats)
		const chats_list = (chats != null) ? (chats.length >0) ? chats.map(({ id, chat_members, chat_messages }, i) => {
			console.log(chat_messages)
			const last_message = chat_messages[0];
			const last_message_list = last_message 
			? last_message.user.name + " : " + last_message.message 
			: "No message"
			const chat_members_list = chat_members.map(({ users }) => {
				let user = users[0];
				return (
					<div className="member">
						<img src={user.icon} />
						<span>{user.name}</span>
					</div>
				)
			})
			console.log(this.props)
			return (
					<div 
						key={i}
						onClick={this.goto_chatroom.bind(this, id)}
						className="item"
					>
						<div class="last_message">
							{last_message_list}
						</div>
						<div class="members">
							{chat_members_list}
						</div>
					</div>
			)
		})
		: (
			<div>You havn't join any chatrooms yet. Let's do it by clicking the button below.</div>
		)
		: (
			<div>You havn't join any chatrooms yet. Let's do it by clicking the button below.</div>
		)
		console.log(this.props)
		return(
			<div class="chatroom_list">
				<h1>Select Chatrooms</h1>
				<div class="content">
					{chats_list}
					<div class="right-wrapper">
						<button class="big-button full" onClick={this.find_new_chatroom}>Search for new buddy</button>
					</div>
				</div>
			</div>
		)
	}
}

const get_chatroom = gql`
	subscription chats_members($user_id: Int!){
		chats(where: {chat_members: {user_id: {_eq: $user_id}}}) {
			chat_messages(limit: 1, order_by: {created: desc}) {
				message
				created
				user {
					name
				}
			}
			chat_members {
				users {
					name
					icon
				}
			}
			id
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