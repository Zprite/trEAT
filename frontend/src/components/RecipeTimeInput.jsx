/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styles from '../styles/RecipeTimeInput.module.css';

export default function RecipeTimeInput({ register }) {
  return (
    <div className={styles.timeInput}>
      <svg className={styles.icon} width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm0 11h6v1h-7v-9h1v8z" /></svg>
      <select name="duration" {...register('duration')} id={styles.timeSelect}>
        <option value={15}>15 min</option>
        <option value={30}>30 min</option>
        <option value={45}>45 min</option>
        <option value={60}>1h</option>
      </select>
    </div>
  );
}
