
import React, {Component} from "react";
import { graphql, compose } from 'react-apollo';

import ChatInput from './components/ChatInput.js'
import ChatMessages from './components/ChatMessages'
import gql from 'graphql-tag';



export class Chatroom extends React.Component {

  state = {
    message: '',
    sender: 691, //set later
    chat_id: null
  }
  componentDidMount(){
    this.setState({
      chat_id: this.props.location.state.chat_id
    })
  }

  _onSend = () => {
    
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    console.log(date)
    this.props.insert_chat_messageMutation({
      variables: {
        message: this.state.message,
        // id: this.state.id,
        sender: this.state.sender,
        chat_id: this.state.chat_room,
        created: date,
      }
    })
    // this.setState(state => {
    //   id: state.id++;
    // })
  }
  _endRef = (element) => {
    this.endRef = element
  }

  render(){
    console.log(this.state)
    return(
      <div>
        <h1>Chatroom</h1>
        <ChatMessages
          messages={this.props.chats_messageQuery.chats_message || []}
          endRef={this._endRef}
        />
          <ChatInput
              message={this.state.message}
              onTextInput={(message) => this.setState({message})}
              onResetText={() => this.setState({message: ''})}
              onSend={this._onSend}
            />
      </div>
    )
  }

  // componentDidMount() {
  //   this.creat_sub_chats_message = this.props.chats_messageQuery.subscribeToMore({
  //     document: sub_chats_message,
  //     updateQuery: (previousState, {subscriptionData}) => {
  //       const newMessage = subscriptionData.data.Message.node
  //       const messages = previousState.allMessages.concat([newMessage])
  //       return {
  //         allMessages: messages
  //       }
  //     },
  //     onError: (err) => console.error(err),
  //   })
  // }
}

const chats_message= gql`
  query chats_message{
    chats_message {
      message
      id
      sender
      created
      chat_id
    }
  }
`

const insert_chats_message = gql`
  mutation insert_chats_message($chat_id: Int!, $created: date!, $message: String!, $sender: Int!) {
    insert_chats_message(objects: {chat_id: $chat_id, created: $created, message: $message, sender: $sender}) {
      returning {
        chat_id
        created
        id
        message
        sender
      }
    }
  }
`

const sub_chats_message = gql`
  subscription {
    chats_message {
      chat_id
      created
      id
      message
      sender
    }
  }
`

export default compose(
  graphql(chats_message, {name: 'chats_messageQuery'}),
  graphql(insert_chats_message, {name: 'insert_chat_messageMutation'})
)(Chatroom);