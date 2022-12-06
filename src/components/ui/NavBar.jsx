import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';
import { logout } from '../../redux/actions/usersAction';
import { useDispatch, useSelector } from 'react-redux';
import { getPermissionsWithRoleAsync } from '../../redux/actions/permissionAction';

export const NavBar = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    const searchPermissions = async () => {
      const user = JSON.parse(localStorage.getItem('user')) 
      dispatch(getPermissionsWithRoleAsync(user?.permissionRole))
    }
    searchPermissions()
  }, [])

  const { permissionUser } = useSelector(
    (state) => state.permissions
  );
  let permissionsConvert 
  if(permissionUser != null){
    permissionsConvert  = permissionUser[0]
  }

  return (
    <nav className={styles.NavBar}>
      <ul>
        <li>
          <NavLink to="/home" className={styles.link}>
            Home
          </NavLink>
        </li>
        {permissionsConvert?.users && (
          <li>
            <NavLink to="/users" className={styles.link}>
              Users
            </NavLink>
          </li>
        )}
        {permissionsConvert?.permissions && (
          <li>
            <NavLink to="/permission" className={styles.link}>
              Role and Permission
            </NavLink>
          </li>
        )}
        {permissionsConvert?.exercises  && (
          <li>
            <NavLink to="/exercises" className={styles.link}>
              Exercises
            </NavLink>
          </li>
        )}
        {(permissionsConvert?.routinesView || permissionsConvert?.routinesAction) && (
          <li>
            <NavLink to="/routines" className={styles.link}>
              Routines
            </NavLink>
          </li>
        )}
        {(permissionsConvert?.healthsView || permissionsConvert?.healthsAction) && (
          <li>
            <NavLink to="/health" className={styles.link}>
              Healths
            </NavLink>
          </li>
        )}
        {permissionsConvert?.posts && (
          <li>
            <NavLink to="/post" className={styles.link}>
              Posts
            </NavLink>
          </li>
        )}
        {permissionsConvert?.subscriptions && (
          <li>
            <NavLink to="/subscription" className={styles.link}>
              Subscriptions
            </NavLink>
          </li>
        )}
        {permissionsConvert?.lessons && (
          <li>
            <NavLink to="/eventMembers" className={styles.link}>
              Lessons
            </NavLink>
          </li>
        )}
        {permissionsConvert?.workout && (
          <li>
            <NavLink to="/workoutevent" className={styles.link}>
              Workout Event
            </NavLink>
          </li>
        )}
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
