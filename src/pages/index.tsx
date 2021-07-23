import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import Layout from '../components/Layouts';
import SignUp from './signup';
import SignIn from './signin';
import Home from './home';
import NewNote from './new';
import EditNote from './edit';
import MyNotes from './mynotes';
import NotePage from './note';
import Favorites from './favorites';

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

const Pages = (props: any) => {
  return (
    <Router>
      <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route path="/note/:id" component={NotePage} />
        <PrivateRoute path="/new" component={NewNote} />
        <PrivateRoute path="/edit/:id" component={EditNote} />
        <PrivateRoute path="/mynotes" component={MyNotes} />
        <PrivateRoute path="/favorites" component={Favorites} />
      </Layout>
    </Router>
  );
};

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!!!</p>;

  return (
    <Route
      {...rest}
      render={props =>
        data.isLoggedIn === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default Pages;
