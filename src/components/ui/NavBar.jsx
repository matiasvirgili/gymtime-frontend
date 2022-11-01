import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';
import { logout } from '../../redux/actions/usersAction';
import { useDispatch } from 'react-redux';

export const NavBar = () => {
  const dispatch = useDispatch();
  return (
    <nav className={styles.NavBar}>
      <ul>
        <li>
          <NavLink to="/home" className={styles.link}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" className={styles.link}>
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/permission" className={styles.link}>
            Role and Permission
          </NavLink>
        </li>
        <li>
          <NavLink to="/exercises" className={styles.link}>
            Exercises
          </NavLink>
        </li>
        <li>
          <NavLink to="/workoutevents" className={styles.link}>
            Workout Event
          </NavLink>
        </li>
        <li>
          <NavLink to="/routines" className={styles.link}>
            Routines
          </NavLink>
        </li>
        <li>
          <NavLink to="/health" className={styles.link}>
            Healths
          </NavLink>
        </li>
        <li>
          <NavLink to="/post" className={styles.link}>
            Posts
          </NavLink>
        </li>
        <li>
          <NavLink to="/subscription" className={styles.link}>
            Subscriptions
          </NavLink>
        </li>
        <li>
          <NavLink to="/eventMembers" className={styles.link}>
            Lessons
          </NavLink>
        </li>
        <li>
          <NavLink to="/workoutevent" className={styles.link}>
            Workout Event
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            onClick={() => dispatch(logout())}
            className={styles.link}
          >
            Log out
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
