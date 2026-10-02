import "./App.css";
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import IndexPage from "./index";
import AdminPage from "./layout/Admin/AdminPage";
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    if (!window.Kakao) return;

    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_KAKAO_JS_KEY);
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/:id" element={<AdminPage />} />
        <Route path="/:pageId" element={<IndexPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
