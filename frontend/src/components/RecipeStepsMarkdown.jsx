import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import styles from '../styles/RecipeStepsMarkdown.module.css';

export default function RecipeStepsMarkdown({ value, setValue }) {
  return (
    <div className={styles.RecipeStepsMarkdown}>
      <h2>Recipe Steps</h2>
      <MDEditor height={200} value={value} onChange={setValue} preview="edit" />
      <div className={styles.previewContainer}>
        <MDEditor.Markdown
          source={value}
          linkTarget="_blank"
        />
      </div>
    </div>
  );
}
