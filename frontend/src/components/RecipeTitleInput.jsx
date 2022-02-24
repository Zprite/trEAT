/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styles from '../styles/RecipeTitleInput.module.css';

export default function RecipeTitleInput({ register }) {
  return (
    <div className={styles.RecipeTitleInput}>
      <input type="text" name="title" {...register('title', { required: true, maxLength: 40 })} className={styles.titleInput} placeholder="Recipe Title..." onKeyPress={(e) => { if (Number(e.charCode) === (13)) e.preventDefault(); }} />
    </div>
  );
}
