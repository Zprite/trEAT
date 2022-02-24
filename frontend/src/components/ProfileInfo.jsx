import React from 'react';
import styles from '../styles/ProfileInfo.module.css';

export default function ProfileInfo({
  // put in character limits for heading and description
  userName, // no more than two lines
  picture,
}) {
  return (
    <div className={styles.profileContainer}>
      <img src={picture} alt="" />
      <h1>{userName}</h1>
    </div>
  );
}
