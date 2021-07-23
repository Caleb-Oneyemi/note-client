import React from 'react';
import ReactDOM from 'react-dom';
import { setContext } from 'apollo-link-context';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import GlobalStyle from './components/GlobalStyle';
import Pages from './pages';

const uri = process.env.API_URI;
const cache = new InMemoryCache();
const httpLink = createHttpLink({ uri });

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem('token') || ''
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink as any) as any,
  cache,
  resolvers: {},
  connectToDevTools: true
});

const data = {
  isLoggedIn: !!localStorage.getItem('token')
};
cache.writeData({ data });
client.onResetStore(async () => cache.writeData({ data }));

const App = () => {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Pages />
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
