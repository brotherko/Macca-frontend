import React, {Component} from "react";
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import axios from 'axios';

var link = 'https://dry-coast-85220.herokuapp.com/matching?user_id=' + 691;
export default class Loading extends React.Component{

  state = {
    chat_id: null
  }
  
  componentDidMount() {
    axios.get(link)
      .then(res => {
        // console.log(res.data.chat_id)
        this.setState({
          chat_id: res.data.chat_id
        })
      })
    //set time to redirect to chat room
    this.timer = setTimeout(()=>{
      //redirect with chat_id
      this.props.history.push({
        pathname: '/chatroom',
        search: '?query=abc',
        state: { chat_id: this.state.chat_id }
      })
    },3000); 
  }
  render() {
    console.log(this.state)
    return(
      <h1>Loading</h1>
    )
  }
}