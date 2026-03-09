import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import AdminPage from './AdminPage';
import LoginPage from './LoginPage';
import ArticleIndexPage from './ArticleIndexPage';
import ArticleDetailPage from './ArticleDetailPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/artikel" element={<ArticleIndexPage />} />
        <Route path="/artikel/:id" element={<ArticleDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
