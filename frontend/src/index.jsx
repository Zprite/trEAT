import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Create from './pages/create';
import RecipePage from './pages/recipe/recipePage';
import RecipeView from './pages/recipeView';
import LogInPage from './pages/logInPage';
import Profile from './pages/profile';

const rootElement = document.getElementById('root');
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="create" element={<Create />} />
      <Route path="recipePage" element={<RecipePage />} />
      <Route path="recipeView" element={<RecipeView />} />
      <Route path="recipe/:id" element={<RecipePage />} />
      <Route path="profile" element={<Profile />} />
      <Route path="logInPage" element={<LogInPage />} />
    </Routes>
  </BrowserRouter>,
  rootElement,
);
