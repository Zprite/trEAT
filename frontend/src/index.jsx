import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Create from './pages/create';
import RecipePage from './pages/recipe/recipePage';
import RecipeView from './pages/recipeView';
import Login from './pages/login';

const rootElement = document.getElementById('root');
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="create" element={<Create />} />
      <Route path="recipePage" element={<RecipePage />} />
      <Route path="recipeView" element={<RecipeView />} />
      <Route path="recipe/:id" element={<RecipePage />} />
      <Route path="login" element={<Login />} />
    </Routes>
  </BrowserRouter>,
  rootElement,
);
