import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Games from './pages/Games';
import News from './pages/News';
import GameDetail from './pages/GameDetail';
import NewsDetail from './pages/NewsDetail';
import './App.css';

function App() {
  const [apiUrl] = useState(process.env.REACT_APP_API_URL || 'http://localhost:5000');

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Header />
        <Routes>
          <Route path="/" element={<Home apiUrl={apiUrl} />} />
          <Route path="/games" element={<Games apiUrl={apiUrl} />} />
          <Route path="/games/:id" element={<GameDetail apiUrl={apiUrl} />} />
          <Route path="/news" element={<News apiUrl={apiUrl} />} />
          <Route path="/news/:id" element={<NewsDetail apiUrl={apiUrl} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
