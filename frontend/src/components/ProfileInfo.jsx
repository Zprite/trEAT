import React from 'react';
import styles from '../styles/ProfileInfo.module.css';

export default function ProfileInfo({
  // put in character limits for heading and description
  userName, // no more than two lines
  profilePicture,
}) {
  return (
    <div className={styles.profileContainer}>
      <img src={profilePicture} alt="" />
      <h1>{userName}</h1>
    </div>
  );
}

ProfileInfo.defaultProps = {
  userName: 'Ola Nordmann',
  profilePicture: 'https://kvener.no/wp-content/uploads/2019/02/blank-profile-picture-973460_640.png',
};
