import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo'
// import { Router, Route, browserHistory } from "react-router"
import {Link, Route, BrowserRouter} from "react-router-dom"

//screens
import Chatroom from "./screens/Chatroom"
import Select_Interest from './screens/Select_interest';
import Select_Lang from './screens/Select_Lang';
import Loading from './screens/loading';
import Login from './screens/login';
import New_user from './screens/new_user';

const client = new ApolloClient({
  uri: "https://csci4140langex.herokuapp.com/v1alpha1/graphql"
});

class App extends React.Component {
  render(){
    return(
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Route exact path="/" component={Login}/>
          <Route path="/new_user" component={New_user}/>
          <Route path="/chatroom" component={Chatroom} />
          <Route path="/interest" component={Select_Interest}/>
          <Route path="/lang" component={Select_Lang}/>
          <Route path="/loading" component={Loading}/>
        </BrowserRouter>
      </ApolloProvider>
    )
  }
}

export default App;
