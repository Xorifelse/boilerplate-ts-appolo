import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-components';

import App from './components'

import './index.css';

const uri = 'http://localhost:4001'
const link = createHttpLink({uri})
const cache = new InMemoryCache()
const client = new ApolloClient({cache, link});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
, document.getElementById('root'));
