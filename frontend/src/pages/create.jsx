import React from 'react';
import Header from '../components/Header';
import RecipeImageInput from '../components/RecipeImageInput';
import '../styles/globals.css';

export default function Create() {
  return (
    <div className="centeredPageWrapper">
      <Header title="Create recipe" />
      <div className="recipeCreator">
        <RecipeImageInput />
      </div>
      <div>Ekstra innhold på siden</div>
    </div>
  );
}
