import React from 'react';
import styles from './NavBar.module.scss';
import {
  useAuthState,
  logout,
  useAuthDispatch,
} from '../../context';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";

export const NavBar = () => {
  const {userDetails} = useAuthState();
  const history = useHistory();
  const dispatch = useAuthDispatch();

  const handleLogout = async () => {
    await logout(dispatch);
    history.push(`/`);
  }

  return (
    <div className={styles.container}>

      <div className={styles.right}>
        GG
      </div>

      <div className={styles.left}>
        <Link  className={styles.username} to={`/users/${userDetails.id}`}>
          {userDetails.first_name[0]}{userDetails.last_name[0]}
        </Link>

        <div className={styles.logout}>
          <Button
            onClick={() => handleLogout()}
            color="primary"
            variant="outlined"
          >
            Logout
          </Button>
        </div>

      </div>
    </div>
  )
}

export default NavBar;