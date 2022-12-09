import React from 'react';
import PropTypes from 'prop-types';
import styles from './Header.module.css';
import logo from '../images/NutriTimeLogo.png'
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
        <a href="https://www.instagram.com/ivan.sanger" target="_blank" rel="noopener noreferrer">
          <AiFillInstagram className={styles.ig}/>
        </a>
        <a href="https://twitter.com/SangerIvan" target="_blank" rel="noopener noreferrer">
          <BsTwitter className={styles.tw}/>
        </a>
        <a href="https://www.youtube.com/@auron" target="_blank" rel="noopener noreferrer">
          <AiFillYoutube className={styles.yt}/>
        </a>
      </div>
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
