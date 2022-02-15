import React, { useState } from 'react';
import styles from '../styles/RecipeIngredientsInput.module.css';

export default function RecipeIngredientsInput() {
  const [ingredients, setIngredients] = useState([]);
  const [description, setDescription] = useState('');
  const [ingredientId, setIngredientId] = useState(0);

  const removeIngredient = (event) => {
    const newIngredients = ingredients.filter(
      (ingredient) => ingredient.id !== Number(event.target.id),
    );
    setIngredients(newIngredients);
  };

  function handleAdd() {
    setIngredientId(ingredientId + 1);
    const newIngredients = ingredients.concat({ description, id: ingredientId });
    setIngredients(newIngredients);
    setDescription('');
  }

  function handleChange(event) {
    if (Number(event.charCode) === 13) {
      handleAdd();
      return;
    }
    setDescription(event.target.value);
  }

  return (
    <div className={styles.RecipeIngredientsInput}>
      <h2>Ingredients</h2>
      <ul id="recipeList">
        {ingredients.map((ingredient) => (
          <li key={ingredient.id}>
            <button type="button" id={ingredient.id} onClick={removeIngredient}>-</button>
            {ingredient.description}
          </li>
        ))}
      </ul>
      <div className={styles.addEntryContainer}>
        <button type="button" onClick={handleAdd}>+</button>
        <input type="text" value={description} id="newIngredientSubmission" onChange={handleChange} onKeyPress={handleChange} />
      </div>
    </div>
  );
}
