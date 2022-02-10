import React from 'react';
import styles from '../styles/RecipeDescriptionInput.module.css';

export default function RecipeDescriptionInput() {
  return (
    <div className={styles.RecipeDescriptionInput}>
      <h2>Short Description</h2>
      <textarea id="descTextArea" name="descTextArea" rows="4" cols="50" placeholder="Write a short description of your dish..." />
    </div>
  );
}
