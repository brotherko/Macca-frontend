import React, { Component} from 'react'
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag'
import ChatInput from './ChatInput.js'
import DiffMessage from './diffMessage'

export class CorrectionField extends Component{
	constructor(props){
		super(props)
		this.state = {
			//for correction
			correct_message: null,
			correct_message_id: props.location.state.message_id,
		}
	}

	_onCorrectionSend = () => {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    //do the correction upload
    this.props.insert_correction_messageMutation({
      variables: {
        corrected_message: this.state.correct_message,
        created: today,
        message_id: this.state.correct_message_id,
        corrected_by: this.getCookie('user_id')
      }
    })
    //reset the state
    this.setState({
      correct_message_id: null
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
	go_back = () => {
		this.props.history.goBack()
	}
	render() {
		const { chats_correction } = this.props.chats_correctionSub
    const k = chats_correction && this.props.current_msgSub.chats_message ? (
      chats_correction.map((corr, i) => (
				<div className="correct_msg">
          <DiffMessage
            message={this.props.current_msgSub.chats_message[0].message}
            corr_message={corr.corrected_message}
					/>
				</div>
					// <div>{corr.corrected_message}</div>
      ))
    )
		: null
		console.log(this.props)
		return(
			<div>
				<h1><i onClick={this.go_back} class="arrow left"></i>Language Correction</h1>
				
				{this.props.current_msgSub.chats_message
					?<div className="correction">
						<div className='Message'>{this.props.current_msgSub.chats_message[0].message}</div>
						{k}
						{this.props.location.state.corr
							?<ChatInput
								message={this.state.correct_message != null ? this.state.correct_message : this.props.current_msgSub.chats_message[0].message}
								onTextInput={(correct_message) => this.setState({correct_message})}
								onResetText={() => this.setState({correct_message: this.props.current_msgSub.chats_message[0].message, correct_message_id: this.props.location.state.message_id,})}
								onSend={this._onCorrectionSend}
								placeHolder='Correction'
							/>
							:null
						}
					</div>
					:null
				}
				
			</div>
		)
	}
}

const current_msg = gql`
	query chats_message($id: Int!){
		chats_message(where: {id: {_eq: $id}}) {
			message
			id
		}
	}
`

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
const insert_correction_message = gql`
  mutation insert_chats_correction($corrected_message: String!, $corrected_by: Int!, $created: timestamptz!, $message_id: Int!){
    insert_chats_correction(objects: {corrected_message: $corrected_message, corrected_by: $corrected_by, created: $created, message_id: $message_id}) {
      returning {
        corrected_message
        created
        id
        message_id
        corrected_by
      }
    }
  }
`

export default compose(
	graphql(sub_chats_correction, {
		name: "chats_correctionSub",
		options: (props) => {
			return{
				variables: {
					message_id: props.location.state.message_id
				}
			}
		}
	}),
	graphql(insert_correction_message, {name: "insert_correction_messageMutation"}),
	graphql(current_msg, {
		name: "current_msgSub",
		options: (props) => {
			return{
				variables: {
					id: props.location.state.message_id
				}
			}
		}
	}),
)(CorrectionField)

//original message <- msg id with a correction button 
//correction message <- msg id // sub of corr
//input field with the correction updated mutation

