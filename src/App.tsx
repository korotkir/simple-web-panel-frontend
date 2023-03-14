import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './Styles/main/Main.css';
import Sidebar from './UI/Sidebar/Sidebar';
import AddCategory from './pages/AddCategory';
import General from './pages/General';
import News from './pages/News';
import Posts from './pages/Posts';
import Settings from './pages/Settings';


function App() {
  return (
    <BrowserRouter>
      <div className="container" style={{display: 'flex'}}>
        <Sidebar />
        <Routes>
          <Route path="/" element={<General />} />
          <Route path="news" element={<News />} />
          <Route path="posts" element={<Posts />} />
          <Route path="settings" element={<Settings />} />
          <Route path="new" element={<AddCategory />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
