import React, { Component} from 'react'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class ChatMessage extends Component {

  render() {
    const { chats_correction } = this.props.chats_correctionSub
    
    return (
      <div className='ChatMessage'>
        {/* <div className='MessageHeader'>
          <div className='Username'>{this.props.username}</div>
          <div className='Time'>({ago})</div>
        </div> */}
        <div className='Message'>{this.props.message}</div>
        {chats_correction
          ?<div>
            {
              chats_correction.map((corr, i) => {
                return(
                  <div>Correction: {corr.corrected_message}</div>
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
const sub_chats_correction = gql`
  subscription chats_correction($message_id: Int!){
    chats_correction(where: {message_id: {_eq: $message_id}}) {
      corrected_message
      corrected_by
      created
      id
      message_id
    }
  }
`

export default graphql(sub_chats_correction, {
  name: "chats_correctionSub",
  options: (props) => {
    return{
      variables: {
        message_id: props.message_id
      }
    }
  }
})(ChatMessage)