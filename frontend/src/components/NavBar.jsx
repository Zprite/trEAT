import React from 'react';
import cn from 'classnames';
import { FaRegUser, FaPlus, FaSearch } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import styles from '../styles/Navbar.module.css';

export default function NavBar() {
  return (
    <div className={styles.navbar}>
      <Link to="/" className={styles.logoButton}>
        <Logo />
      </Link>
      <div>
        <Link to="/" className={styles.searchButton}>
          <div>
            <FaSearch className={styles.searchIcon} />
          </div>
        </Link>
        <Link to="/create" className={cn(styles.navbarButton, styles.createButton)}>
          <div>
            <FaPlus className={styles.plusIcon} />
          </div>
        </Link>
        <Link to="/create" className={cn(styles.navbarButton, styles.profileButton)}>
          <div>
            <FaRegUser className={styles.userIcon} />
          </div>
        </Link>
        <Link to="/logout" className={cn(styles.navbarButton, styles.profileButton)}>
          <div type="button" className={styles.button}>
            <FiLogOut className={styles.userIcon} />
          </div>
        </Link>
      </div>
    </div>
  );
}
