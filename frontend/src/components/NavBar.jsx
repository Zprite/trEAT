import React from 'react';
import { FaRegUser, FaPlus, FaSearch } from 'react-icons/fa';
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
        <Link to="/create" className={styles.createButton}>
          <div>
            <FaPlus className={styles.plusIcon} />
          </div>
        </Link>
        <Link to="/create" className={styles.profileButton}>
          <div>
            <FaRegUser className={styles.userIcon} />
          </div>
        </Link>
      </div>
    </div>
  );
}
