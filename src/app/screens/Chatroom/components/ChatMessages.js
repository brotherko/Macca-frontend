import React, { Component} from 'react';
import ChatMessage from "./ChatMessage"

class ChatMessages extends Component {
    
    render() {
      const {correction} = this.props
      return (
        <div className='ChatMessages'>
          {this.props.messages.map((message, i) => {
            return (
            <div className={message.sender != this.props.user_id ? 'incoming_msg' : 'sender_msg'}>
              <div onClick={correction.bind(this, message)}>
                <ChatMessage
                  key={i}
                  message={message.message}
                  message_id={message.id}
                />
              </div>
              {/* {message.sender != this.props.user_id
                ?<button onClick={correction.bind(this, message)}>Correction</button>
                :null
              } */}
            </div>
            )
          })}
          <div style={ {float:"left", clear: "both"} }
               ref={el => { this.props.endRef(el) }}></div>
        </div>
      )
    }
  
  }
  
  export default ChatMessages