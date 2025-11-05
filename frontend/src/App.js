import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import SavingList from './pages/SavingList';
import SavingDetail from "./pages/SavingDetail"; // ✅ 새로 만들 상세 페이지

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SavingList />} />
        <Route path="/savings/:id" element={<SavingDetail />} /> {/* 상세 페이지 */}
      </Routes>
    </Router>
  );
}

export default App;
