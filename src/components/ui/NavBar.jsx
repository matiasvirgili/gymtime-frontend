import React, {useEffect} from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';
import { logout } from '../../redux/actions/usersAction';
import { useDispatch, useSelector } from 'react-redux';
import { getPermissionsWithRoleAsync } from '../../redux/actions/permissionAction';
import { AiFillHome,  } from "react-icons/ai";
import { FaUserEdit, FaMoneyBill, FaCommentAlt } from "react-icons/fa";
import { GrSecure, GrUserAdd } from "react-icons/gr";
import { GiWeightLiftingUp } from "react-icons/gi";
import { GoListOrdered  } from "react-icons/go";
import { RiHeartPulseFill } from "react-icons/ri";
import { HiUserGroup } from "react-icons/hi";
import { RiLogoutBoxLine } from "react-icons/ri";

export const NavBar = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    const searchPermissions = async () => {
      const user = JSON.parse(localStorage.getItem('user')) 
      dispatch(getPermissionsWithRoleAsync(user?.permissionRole))
    }
    searchPermissions()
  }, [])

  const isLoggedIn = useSelector((state) => state.users?.credentials?.user); 

  const { permissionUser } = useSelector(
    (state) => state.permissions
  );
  let permissionsConvert 
  if(permissionUser != null){
    permissionsConvert  = permissionUser[0]
  }
  const [stateClicked, setStateClicked] = useState(false);

  return (
    <>
    <div className={stateClicked ? (styles.containerActive) : (styles.container)}>
      <a 
      onClick= {()=> setStateClicked(!stateClicked)}
      className={stateClicked ? (styles.toggleBoxActive) : (styles.toggleBox)}
      >
        <div className={styles.threeLine}>
          <span className={styles.icon}></span>
        </div>
      </a>
      <ul className={stateClicked ? (styles.navItemsActive) : (styles.navItems)}>
        <li id={stateClicked ? (styles.li1Active) : (styles.li1)}>
          <NavLink to="/home" 
          className = {styles.link} >
            <i>
              <AiFillHome/>
            </i>
            <span>home</span>
          </NavLink>
        </li>
      {permissionsConvert?.users && (
        <li id={stateClicked ? (styles.li2Active) : (styles.li2)}>
          <NavLink to="/users" className = {styles.link}>
            <i>
              <FaUserEdit/>
            </i>
            <span>Users</span>
          </NavLink>
        </li>
      )}
      {permissionsConvert?.permissions && (
        <li id={stateClicked ? (styles.li3Active) : (styles.li3)}>
          <NavLink to="/permission" className = {styles.link}>
            <i>
              <GrSecure/>
            </i>
            <span>Role</span>
          </NavLink>
        </li>
      )}
      {permissionsConvert?.exercises  && (
        <li id={stateClicked ? (styles.li4Active) : (styles.li4)}>
          <NavLink to="/exercises" className = {styles.link}>
            <i>
              <GiWeightLiftingUp/>
            </i>
            <span>Exercises</span>
          </NavLink>
        </li>
      )}
      {(permissionsConvert?.routinesView || permissionsConvert?.routinesAction) && (
        <li id={stateClicked ? (styles.li5Active) : (styles.li5)}>
          <NavLink to="/routines" className = {styles.link}>
            <i>
              <GoListOrdered/>
            </i>
            <span>Routines</span>
          </NavLink>
        </li>
      )}
      {(permissionsConvert?.healthsView || permissionsConvert?.healthsAction) && (
        <li id={stateClicked ? (styles.li6Active) : (styles.li6)}>
          <NavLink to="/health" className = {styles.link}>
            <i>
              <RiHeartPulseFill/>
            </i>
            <span>Healths</span>
          </NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li id={stateClicked ? (styles.li7Active) : (styles.li7)}>
          <NavLink to="/post" className = {styles.link}>
            <i>
              <FaCommentAlt/>
            </i>
            <span>Posts</span>
          </NavLink>
        </li>
      )}
      {permissionsConvert?.subscriptions && (
        <li id={stateClicked ? (styles.li8Active) : (styles.li8)}>
          <NavLink to="/subscription" className = {styles.link}>
            <i>
              <FaMoneyBill/>
            </i>
            <span>Subscription</span>
          </NavLink>
        </li>
      )}
      {permissionsConvert?.lessons && (
        <li id={stateClicked ? (styles.li9Active) : (styles.li9)}>
          <NavLink to="/eventMembers" className = {styles.link}>
            <i>
              <GrUserAdd/>
            </i>
            <span>Lessons</span>
          </NavLink>
        </li>
      )}
      {permissionsConvert?.workout && (
        <li id={stateClicked ? (styles.li10Active) : (styles.li10)}>
          <NavLink to="/workoutevent" className = {styles.link}>
            <i>
              <HiUserGroup/>
            </i>
            <span>Workout Event</span>
          </NavLink>
        </li>
      )}
        <li id={stateClicked ? (styles.li11Active) : (styles.li11)}>
          <NavLink
            to="/"
            onClick={() => dispatch(logout())}
            className = {styles.link}
            >
            <i>
              <RiLogoutBoxLine/>
            </i>
            <span>LogOut</span>
          </NavLink>
        </li>
      </ul>
    </div>
    </>
    
  );
};
