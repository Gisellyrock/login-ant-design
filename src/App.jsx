import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import PageLayout from './pages/Layout';
import PageForm from './pages/Form';
import PageTable from './pages/Table';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/layout" element={<PageLayout />} />
        <Route path="/form" element={<PageForm />} />
        <Route path="/table" element={<PageTable />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
