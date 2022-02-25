import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Create from './pages/Create';
import RecipePage from './pages/recipe/RecipePage';
import RecipeView from './pages/RecipeView';
import Login from './pages/Login';
import Register from './pages/Register';

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
      <Route path="register" element={<Register />} />
    </Routes>
  </BrowserRouter>,
  rootElement,
);
