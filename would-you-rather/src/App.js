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
      <Routes>
        <Route path='/home' element={<RequireAuth><HomePage value={users.receiveUser}/></RequireAuth>} />
        <Route path='/add' element={<RequireAuth><NewQuestionPage value={users.receiveUser}/></RequireAuth>} />
        <Route path='/leaderboard' element={<RequireAuth><LeaderBoardPage value={users.receiveUser}/></RequireAuth>} />
        <Route path='/questions/:question_id' element={<RequireAuth><AnsweredItem value={users.receiveUser}/></RequireAuth>} />
        <Route path='/login' element={<AuthPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>


  );
}

export default App;
