import React, { Component} from 'react';
import ChatMessage from "./ChatMessage"

class ChatMessages extends Component {
    
    render() {
      console.log(this.props.messages)
      return (
        <div className='ChatMessages'>
          {this.props.messages.map((message, i) => {
            return (
            <div>
              <ChatMessage
                key={i}
                message={message.message}
                // username={message.sentBy ? message.sentBy.name : 'Anonymous'}
                // time={message.createdAt}
              />
              {message.sender != this.props.user_id
                ?<p>Correction</p>
                :null
              }
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