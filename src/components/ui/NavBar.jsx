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
