import React from 'react';
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
          <Route path="/" element={<General />} />
          {/* <Route path="news" element={<News />} /> */}
          <Route path="posts" element={<Posts />} />
          <Route path="settings" element={<Settings />} />
          <Route path="new" element={<AddCategory />} />
          <Route path="*" element={<Template />} />
        </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
