import React from 'react';
import styles from './Home.module.scss';
import { Link } from "react-router-dom";
import { PATH } from '../constants';

export const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Greatness</h1>
        <h3>A progress tracking app: One session at a time</h3>
      </div>

      <div className={styles.authButtons}>
        <div className={styles.signUpButton}>
          <Link  className={styles.signUpButton} to={PATH.SIGNUP}>Sign Up</Link>
        </div>

        <div className={styles.loginButton}>
          <Link className={styles.loginButton} to={PATH.LOGIN}>Log In</Link>
        </div>
      </div>
    </div>
  )
}

export default Home;
