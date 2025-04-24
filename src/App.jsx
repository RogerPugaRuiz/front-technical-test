import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProductListPage from './pages/ProductListPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import Header from './layouts/Header';

function App() {
  return (
    <Router>
      <div className='dark:bg-neutral-900 dark:text-white flex flex-col min-h-screen'>
      <Header />
      <div className='grow'>
      <Routes>
        <Route path="/" element={<ProductListPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </div>
      </div>
    </Router>
  )
}

export default App
