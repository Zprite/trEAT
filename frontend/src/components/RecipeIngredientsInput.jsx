import React, { useState, useEffect } from 'react';
import styles from '../styles/RecipeIngredientsInput.module.css';

export default function RecipeIngredientsInput({ passData }) {
  const [ingredients, setIngredients] = useState([]);
  const [name, setName] = useState('');
  const [ingredientId, setIngredientId] = useState(0);

  const removeIngredient = (event) => {
    const newIngredients = ingredients.filter(
      (ingredient) => ingredient.id !== Number(event.target.id),
    );
    setIngredients(newIngredients);
  };

  function handleAdd() {
    if (name !== '') {
      setIngredientId(ingredientId + 1);
      const newIngredients = ingredients.concat({ name, id: ingredientId });
      setIngredients(newIngredients);
      setName('');
    }
  }

  function handleChange(event) {
    if (Number(event.charCode) === 13) {
      event.preventDefault();
      handleAdd();
      return;
    }
    setName(event.target.value);
  }

  useEffect(() => {
    passData(ingredients);
  }, [ingredients]);

  return (
    <div className={styles.RecipeIngredientsInput}>
      <h2 className={styles.ingredientTitle}>Ingredients</h2>
      <ul id="recipeList" className={styles.recipeList}>
        {ingredients.map((ingredient) => (
          <li className={styles.ingredientList} key={ingredient.id}>
            <button type="button" className={styles.deleteButton} id={ingredient.id} onClick={removeIngredient}>-</button>
            {ingredient.name}
          </li>
        ))}
      </ul>
      <div>
        <button type="button" className={styles.addButton} onClick={handleAdd}>+</button>
        <input type="text" value={name} className={styles.entryContainer} id="newIngredientSubmission" onChange={handleChange} onKeyPress={handleChange} />
      </div>
    </div>
  );
}
