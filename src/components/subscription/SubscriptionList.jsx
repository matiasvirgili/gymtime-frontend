import React from 'react';
import PropTypes from 'prop-types';
import { Subscription } from './Subscription';
import { useSelector } from 'react-redux'

export const SubscriptionsList = ({ subscriptions }) => {
  const isLoggedIn = useSelector((state) => state.users?.credentials?.user?._id); 
  
  return subscriptions.map((subs) => (
    <Subscription key={subs._id} subscription={subs} isLoggedIn={isLoggedIn}/>
  ));
};

SubscriptionsList.propTypes = {
  subscriptions: PropTypes.array.isRequired,
};
