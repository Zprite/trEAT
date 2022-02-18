import React from 'react';
import styles from '../styles/IngredientsView.module.css';

export default function IngredientsView({ recipeObject }) {
  const ingredientsList = recipeObject.ingredients;
  // eslint-disable-next-line max-len
  const listItems = ingredientsList.map((ingredient) => (
    <li key={ingredient.id}>
      {ingredient.amount}
      {ingredient.unit}
      {' '}
      {ingredient.name}
      {' '}

    </li>
  ));
  return (
    <ul id="ingredients" className={styles.ingredientsList}>
      {listItems}
    </ul>
  );
}
