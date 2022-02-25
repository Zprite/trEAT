import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Create from './pages/Create';
import RecipePage from './pages/recipe/RecipePage';
import Register from './pages/Register';
import { UserProvider } from './context/UserContext';

const rootElement = document.getElementById('root');
render(
  <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="create" element={<Create />} />
        <Route path="recipePage" element={<RecipePage />} />
        <Route path="recipe/:id" element={<RecipePage />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  </UserProvider>,
  rootElement,
);
