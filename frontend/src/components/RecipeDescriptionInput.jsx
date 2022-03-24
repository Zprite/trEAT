/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import cn from 'classnames';
import styles from '../styles/RecipeDescriptionInput.module.css';

export default function RecipeDescriptionInput({ register }) {
  return (
    <div className={cn(styles.RecipeDescriptionInput, 'white')}>
      <h2>Short Description</h2>
      <textarea id="descTextArea" className={styles.descTextArea} name="description" {...register('description', { required: true, maxLength: 200 })} rows="4" cols="50" placeholder="Write a short description of your dish..." />
    </div>
  );
}
