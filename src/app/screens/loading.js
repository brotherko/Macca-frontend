import React, {Component} from "react";
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import '../../style/loading.css'

import axios from 'axios';

export default class Loading extends React.Component{

  state = {
    chat_id: null,
    user_id: null,
  }
  
  componentDidMount() {
    this.setState({
      user_id: this.getCookie('user_id')
    })
    axios.get('https://dry-coast-85220.herokuapp.com/matching?user_id=' + this.getCookie('user_id'))
      .then(res => {
        // console.log(res.data.chat_id)
        this.setState({
          chat_id: res.data.chat_id
        })

      })
    //set time to redirect to chat room
    this.timer = setTimeout(()=>{
      // redirect with chat_id
      this.props.history.push({
        pathname: '/chatroom',
        search: '?query=abc',
        state: { chat_id: this.state.chat_id}
      })
      // this.props.history.push("/chatroom")
    },5000); 
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
  render() {
    console.log(this.state)
    return(
      <div>
        <h1>Your perfect match is ...</h1>
        <div class="loader">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    )
  }
}