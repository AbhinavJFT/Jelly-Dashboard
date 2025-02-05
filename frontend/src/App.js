import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CompanyDetails from './pages/CompanyDetails';
import AddCompany from './pages/AddCompany';
import ErrorPage from './pages/ErrorPage';
import CompanyChatBotDetails from './pages/CompanyChatBotDetails';
import SuccessIcon from './components/SuccessIcon';
import AddAdmin from './pages/AddAdmin';
import { useEffect } from 'react';
import ChatPage from './pages/ChatPage';
import Companies from './pages/Companies';
import './index.css';
import CompanyCostings from './pages/CompanyCostings';
import CompanyQueries from './pages/CompanyQueries';

function App() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem('role');

  useEffect(() => {
    if (token) {
      if (location.pathname === '/') {
        navigate('/admin/dashboard');
      }
    }
  }, [navigate]);

  useEffect(() => {});

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/admin/dashboard"
          element={token ? <Dashboard /> : <ErrorPage />}
        />
        <Route
          path="/company/details/:id"
          element={token ? <CompanyDetails /> : <ErrorPage />}
        />
        <Route
          path="/add/company"
          element={token && role === 'admin' ? <AddCompany /> : <ErrorPage />}
        />
        <Route
          path="/chatbot/:id/queries"
          element={token ? <CompanyChatBotDetails /> : <ErrorPage />}
        />
        <Route path="/success" element={<SuccessIcon />} />
        <Route path="/add/admin" element={<AddAdmin />} />
        <Route path="/chat/:id" element={<ChatPage />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/company/costings" element={<CompanyCostings />} />
        <Route path="/company/queries" element={<CompanyQueries />} />
      </Routes>
    </>
  );
}

export default App;
