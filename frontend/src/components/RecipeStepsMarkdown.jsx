import React from 'react';
import styles from '../styles/RecipeStepsMarkdown.module.css';

export default function RecipeStepsMarkdown() {
  return (
    <div className={styles.RecipeStepsMarkdown}>
      <h2>Recipe Steps</h2>
      <textarea id="descTextArea" name="descTextArea" rows="4" cols="50" placeholder="Write detailed steps for the recipe..." />
    </div>
  );
}
