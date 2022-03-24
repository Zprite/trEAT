import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import cn from 'classnames';
import styles from '../styles/RecipeStepsMarkdown.module.css';

export default function RecipeStepsMarkdown({ value, setValue }) {
  return (
    <div className={cn(styles.RecipeStepsMarkdown, 'white')}>
      <h2>Recipe Steps</h2>
      <MDEditor height={300} value={value} onChange={setValue} preview="edit" />
      <div className={styles.previewContainer}>
        <MDEditor.Markdown
          source={value}
          linkTarget="_blank"
        />
      </div>
    </div>
  );
}
