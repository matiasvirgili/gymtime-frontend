import React from 'react';
import PropTypes from 'prop-types';
import styles from './Header.module.css';
import logo from '../images/GymTimeLogo.png'
import { AiFillInstagram, AiFillYoutube } from "react-icons/ai";
import { BsTwitter } from "react-icons/bs";

export const Header = ({ title }) => {
  return (
    <div className={styles.header}>
      <div className={styles.logoAndTitle}>
        <img src={logo}></img>
        <h1>{title}</h1>
      </div>
      <div className={styles.redes}>
        <a href="https://www.instagram.com/gymtimemarket/?igshid=N2ZiY2E3YmU%3D" target="_blank" rel="noopener noreferrer">
          <AiFillInstagram className={styles.ig}/>
        </a>
        <a href="https://twitter.com/Gymtime_market?t=FE9dAyJ-E8v4Y_3UK3boLw&s=08" target="_blank" rel="noopener noreferrer">
          <BsTwitter className={styles.tw}/>
        </a>
        <a href="https://www.youtube.com/watch?v=nED13tmntbo" target="_blank" rel="noopener noreferrer">
          <AiFillYoutube className={styles.yt}/>
        </a>
      </div>
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
