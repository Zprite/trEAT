import React from 'react';
import styles from '../styles/RecipeTitleInput.module.css';

export default function RecipeTitleInput() {
  return (
    <div className={styles.RecipeTitleInput}>
      <input type="text" className={styles.titleInput} placeholder="Recipe Title..." />
    </div>
  );
}
