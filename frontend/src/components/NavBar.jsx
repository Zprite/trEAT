import React from 'react';
import Logo from './Logo';
import styles from '../styles/Navbar.module.css';

export default function NavBar() {
  return (
    <div className={styles.navbar}>
      <div>Navbar</div>
      <div><Logo /></div>
    </div>
  );
}
