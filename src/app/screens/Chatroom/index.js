
import React, {Component} from "react";
import { graphql, compose } from 'react-apollo';

import ChatInput from './components/ChatInput.js'
import ChatMessages from './components/ChatMessages'
import gql from 'graphql-tag';



export class Chatroom extends React.Component {

  state = {
    message: '',
    sender: 351, //set later
    receiver: 352, //set later
  }

  _onSend = () => {
    console.log(`Send: ${this.state.message}`)
    // this.props.createMessageMutation({
    //   variables: {
    //     text: this.state.message,
    //     sentById: this.props.userId
    //   }
    // })
  }
  _endRef = (element) => {
    this.endRef = element
  }

  componentDidMount() {
    this.createMessageSubscription = this.props.allMessagesQuery.subscribeToMore({
      document: newMessageSubscription,
      updateQuery: (previousState, {subscriptionData}) => {
        const newMessage = subscriptionData.data.Message.node
        const messages = previousState.allMessages.concat([newMessage])
        return {
          allMessages: messages
        }
      },
      onError: (err) => console.error(err),
    })
  }

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
      receiver
      sender
      created
    }
  }
`

export default graphql(chats_message, {name: 'chats_messageQuery'})(Chatroom);