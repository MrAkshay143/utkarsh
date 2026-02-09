import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SlideProvider } from './context/SlideContext';
import Presentation from './components/Presentation';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

const App: React.FC = () => {
  return (
    <SlideProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Presentation />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </SlideProvider>
  );
};

export default App;