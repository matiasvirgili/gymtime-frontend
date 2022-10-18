import React from 'react';
import PropTypes from 'prop-types';
import { EventMember } from './EventMember';
import { useSelector } from 'react-redux'

export const EventMemberList = ({ workoutEvents }) => {
  const isLoggedIn = useSelector((state) => state.users?.credentials?.user?._id); 

  return workoutEvents.map((wkoes) => (
    <EventMember key={wkoes._id} workoutEvent={wkoes} isLoggedIn={isLoggedIn}/>
  ));
};

EventMemberList.propTypes = {
  workoutEvents: PropTypes.array.isRequired,
};
