import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

// eslint-disable-next-line max-len
const PrivateRoute = ({ component: Component, isAuth, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (isAuth
      ? <Component {...props} />
      : <Redirect to="/" />)}
  />
);

export default PrivateRoute;

PrivateRoute.propTypes = {
    component: PropTypes.object,
    isAuth: PropTypes.bool
  };