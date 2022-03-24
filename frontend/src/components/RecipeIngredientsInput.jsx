import React, { useState } from 'react';
import { ObjectID } from 'bson';
import cn from 'classnames';
import styles from '../styles/RecipeIngredientsInput.module.css';

export default function RecipeIngredientsInput({ ingredients, setIngredients }) {
  const [name, setName] = useState('');
  const [ingredientId, setIngredientId] = useState(new ObjectID().toString());

  const removeIngredient = (event) => {
    const newIngredients = ingredients.filter(
      (ingredient) => String(ingredient._id) !== String(event.target.id),
    );
    setIngredients(newIngredients);
  };

  function handleAdd() {
    if (name !== '') {
      setIngredientId(new ObjectID().toString());
      const newIngredients = ingredients.concat({ name, _id: ingredientId });
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

  return (
    <div className={cn(styles.RecipeIngredientsInput, 'white')}>
      <div className={cn(styles.listContainer)}>
        <h2 className={styles.ingredientTitle}>Ingredients</h2>
        <ul id="recipeList" className={cn(styles.recipeList, 'white')}>
          {ingredients.map((ingredient) => (
            <li className={styles.ingredientList} key={ingredient._id}>
              <button type="button" className={styles.deleteButton} id={ingredient._id} onClick={removeIngredient}>-</button>
              {ingredient.name}
            </li>
          ))}
        </ul>
        <div className={styles.addEntryContainer}>
          <button type="button" className={styles.addButton} onClick={handleAdd}>+</button>
          <input
            placeholder="Legg til ingrediens"
            type="text"
            value={name}
            className={styles.input}
            id="newIngredientSubmission"
            onChange={handleChange}
            onKeyPress={handleChange}
          />
        </div>
      </div>
    </div>
  );
}
