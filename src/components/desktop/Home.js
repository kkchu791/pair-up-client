import React from 'react';
import styles from './Home.module.scss';
import { Link } from "react-router-dom";
import { PATH } from '../../constants';

export const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.title}>
          <h1>Greatness Go - Productions</h1>
          <h3>An improvement tracking app - changes</h3>
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

      <div className={styles.secondary}>
        <iframe
          width="700"
          height="455"
          src="https://www.youtube-nocookie.com/embed/oHd96fYeCjw"
          title="GG clip"
          frameborder="5px"
          allowfullscreen
        >
        </iframe>
      </div>
      
    </div>
  )
}

export default Home;
