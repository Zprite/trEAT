import React from 'react';
import AuthWrapper from '../components/AuthWrapper';
import RecipeView from './RecipeView';

export default function Home() {
  return (
    <AuthWrapper>
      <RecipeView />
    </AuthWrapper>
  );
}
