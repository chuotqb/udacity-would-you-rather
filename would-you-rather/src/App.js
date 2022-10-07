import './App.css';
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Header from './components/Layout/Header';
import AuthPage from './pages/AuthPage';
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';
import NewQuestionPage from './pages/NewQuestionPage'
import LeaderBoardPage from './pages/LeaderBoardPage';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const App = () => {
  const users = useSelector((state) => state.users);
  const navigate = useNavigate();

  useEffect(() => {
    if (users.receiveUser) {
      navigate("/")
    } else {
      navigate("/login")
    }
  }, [users.receiveUser])

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={!users.receiveUser ? <Navigate to="/login" /> : <HomePage />} />
        <Route path='/add' element={!users.receiveUser ? <Navigate to="/login" /> : <NewQuestionPage />} />
        <Route path='/leaderboard' element={!users.receiveUser ? <Navigate to="/login" /> : <LeaderBoardPage />} />
        {
          !users.receiveUser &&
          <Route path='/login' element={<AuthPage />} />
        }
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
