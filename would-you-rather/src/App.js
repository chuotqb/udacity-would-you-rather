import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from './components/Layout/Header';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import NewQuestionPage from './pages/NewQuestionPage'
import LeaderBoardPage from './pages/LeaderBoardPage';
import AnsweredItem from './components/question/AnsweredItem';
import { useSelector } from 'react-redux';
import NotFoundPage from "./pages/NotFoundPage";
import RequireAuth from './components/Auth/RequireAuth';
import { AuthProvider } from './components/Auth/AuthProvider';

const App = () => {
  const users = useSelector((state) => state.users);
  const navigate = useNavigate();

  useEffect(() => {
    if (users.receiveUser) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, [users.receiveUser]);

  return (

    <div className="App">
      <Header />
      <AuthProvider>
      <Routes>
        <Route path='/home' element={<RequireAuth ><HomePage /></RequireAuth>} />
        <Route path='/add' element={<RequireAuth ><NewQuestionPage /></RequireAuth>} />
        <Route path='/leaderboard' element={<RequireAuth ><LeaderBoardPage/></RequireAuth>} />
        <Route path='/questions/:question_id' element={<RequireAuth ><AnsweredItem /></RequireAuth>} />
        <Route path='/login' element={<AuthPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </AuthProvider>     
    </div>


  );
}

export default App;
