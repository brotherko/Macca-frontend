import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo'
// import { Router, Route, browserHistory } from "react-router"
import {Link, Route, BrowserRouter} from "react-router-dom"

//screens
import Chatroom from "./screens/Chatroom"

const client = new ApolloClient({
  uri: "https://csci4140langex.herokuapp.com/v1alpha1/graphql"
});

class App extends React.Component {
  render(){
    return(
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Route path="/chatroom" component={Chatroom} />
        </BrowserRouter>
      </ApolloProvider>
    )
  }
}

export default App;
