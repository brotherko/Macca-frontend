import React from 'react';
import ApolloClient from "apollo-client";
import { ApolloProvider } from 'react-apollo'
import {Link, Route, BrowserRouter} from "react-router-dom"
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { AnimatedSwitch } from 'react-router-transition';

//screens
import Chatroom from "./screens/Chatroom"
import Select_Interest from './screens/Select_interest';
import Select_Lang from './screens/Select_Lang';
import Loading from './screens/loading';
import Login from './screens/login';
import New_user from './screens/new_user';
import Select_Chatroom from './screens/Select_Chatroom';
import CorrectionField from './screens/Chatroom/components/CorrectionField';

// const client = new ApolloClient({
//   uri: "https://csci4140langex.herokuapp.com/v1alpha1/graphql"
// });

const httpLink = new HttpLink({
  uri: 'https://csci4140langex.herokuapp.com/v1alpha1/graphql'
});

const wsLink = new WebSocketLink({
  uri: `ws://csci4140langex.herokuapp.com/v1alpha1/graphql`,
  options: {
    reconnect: true
  }
});
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);
const cache = new InMemoryCache();
const client = new ApolloClient({ link, cache });


class App extends React.Component {
  render(){
    return(
      <ApolloProvider client={client}>
        <BrowserRouter>
          <AnimatedSwitch
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}
            className="wrapper"
          >
          <Route exact path="/" component={Login}/>
          <Route path="/corr" component={CorrectionField}/>
          <Route path="/select_chatroom" component={Select_Chatroom}/>
          <Route path="/new_user" component={New_user}/>
          <Route path="/chatroom" component={Chatroom} />
          <Route path="/interest" component={Select_Interest}/>
          <Route path="/lang" component={Select_Lang}/>
          <Route path="/loading" component={Loading}/>
          </AnimatedSwitch>
        </BrowserRouter>
      </ApolloProvider>
    )
  }
}

export default App;
