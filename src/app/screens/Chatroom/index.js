
import React, {Component} from "react";
import { graphql, compose } from 'react-apollo';

import ChatInput from './components/ChatInput.js'
import ChatMessages from './components/ChatMessages'
import gql from 'graphql-tag';



export class Chatroom extends React.Component {

  state = {
    message: '',
    sender: 351, //set later
    chat_room: 352, //set later
    id: 5,
  }

  _onSend = () => {
    
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    console.log(date)
    this.props.insert_chat_messageMutation({
      variables: {
        message: this.state.message,
        id: this.state.id,
        sender: this.state.sender,
        chat_id: this.state.chat_room,
        created: date,
      }
    })
    this.setState(state => {
      id: state.id++;
    })
  }
  _endRef = (element) => {
    this.endRef = element
  }

  // componentDidMount() {
  //   this.createMessageSubscription = this.props.chats_messageQuery.subscribeToMore({
  //     document: newMessageSubscription,
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

  render(){
    console.log(this.props)
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
  mutation insert_chats_message($id: Int!,$chat_id: Int!, $created: date!, $message: String!, $sender: Int!) {
    insert_chats_message(objects: {id: $id, chat_id: $chat_id, created: $created, message: $message, sender: $sender}) {
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

export default compose(
  graphql(chats_message, {name: 'chats_messageQuery'}),
  graphql(insert_chats_message, {name: 'insert_chat_messageMutation'})
)(Chatroom);