import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
    <BrowserRouter>
      <div className="container" style={{display: 'flex', flex: '1 5',}}>
        <Sidebar />
        <Routes>
          <Route path="/simple-web-panel-frontend/main" element={<General />} />
          <Route path="/simple-web-panel-frontend/posts" element={<Posts />} />
          {/* <Route path="/simple-web-panel-frontend/settings" element={<Settings />} /> */}
          <Route path="/simple-web-panel-frontend/new" element={<AddCategory />} />
          <Route path="/simple-web-panel-frontend/*" element={<Template />} />
        </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
