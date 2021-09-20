import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import {store} from './store';
// import graphQLClient from "./GraphQLClient";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";


export const graphQLClient = new ApolloClient({
  uri: "https://my-todolist-web.azurewebsites.net/graphql",
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={graphQLClient}>
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
