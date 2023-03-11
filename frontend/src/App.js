import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Product from './components/product/Product';
import './App.css';
import Add from './components/add/Add';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/add" element={<Add />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
