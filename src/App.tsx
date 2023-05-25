import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import logo from './logo.svg';
import './Styles/main/Main.css';
import Sidebar from './UI/Sidebar/Sidebar';
import AddCategory from './pages/AddCategory/AddCategory';
import General from './pages/General/General';
import News from './pages/RenderTable/RenderTable';
import Posts from './pages/Posts';
import Settings from './pages/Settings';
import Template from './components/Template/Template';

function App() {
  return (
    <BrowserRouter basename='/simple-web-panel-frontend'>
      <div className="container" style={{display: 'flex', flex: '1 5',}}>
        <Sidebar />
        <Routes>
        <Route path="/" element={<Navigate replace to="/main" />} />
          <Route path="/main" element={<General />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/new" element={<AddCategory />} />
          <Route path="/*" element={<Template />} />
        </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
