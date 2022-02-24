/* eslint-disable no-underscore-dangle */
import React from 'react';
import styles from '../styles/IngredientsView.module.css';

export default function IngredientsView({ recipeObject }) {
  // eslint-disable-next-line max-len
  return (
    <ul id="ingredients" className={styles.ingredientsList}>
      {recipeObject.ingredients && recipeObject.ingredients.map((ingredient) => (
        <li key={ingredient._id}>
          {ingredient.amount}
          {ingredient.unit}
          {' '}
          {ingredient.name}
          {' '}

        </li>
      ))}
    </ul>
  );
}
