import React from 'react';
import styles from '../styles/RecipeTimeInput.module.css';

export default function RecipeTimeInput() {
  return (
    <div className={styles.timeInput}>
      <select name="timeSelect" id={styles.timeSelect}>
        <option value="15">15 min</option>
        <option value="30">30 min</option>
        <option value="45">45 min</option>
        <option value="60">1h</option>
      </select>
    </div>
  );
}
