import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from './components/Layout/Header';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import NewQuestionPage from './pages/NewQuestionPage'
import LeaderBoardPage from './pages/LeaderBoardPage';
import { useSelector } from 'react-redux';
import NotFoundPage from "./pages/NotFoundPage";
import PollPage from './pages/PollPage';
import ProtectedRoutes from './components/Auth/ProtectedRoutes';
import { useDispatch } from 'react-redux';
import { getUsers } from './slices/usersSlice';
import { getQuestions } from './slices/questionSlice';

const App = () => {
  const isAuth = useSelector((state) => state.users.isAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const questions = useSelector((state) => state.questions);

  useEffect(() => {
    if (!users.listUser) {
      dispatch(getUsers());
    }

    if (!questions.listQuestion) {
      dispatch(getQuestions());
    }
  }, [isAuth]);

  // useEffect(() => {
  //   if (users.receiveUser) {
  //     navigate("/home");
  //   } else {
  //     navigate("/login");
  //   }
  // }, [users.receiveUser]);

  return (
    <div className="App">
      {
        isAuth && <Header />
      }
      <Routes>
        <Route path='/home' element={isAuth ? <HomePage /> : <AuthPage />} />
        <Route path='/add' element={isAuth ? <NewQuestionPage /> : <AuthPage />} />
        <Route path='/leaderboard' element={isAuth ? <LeaderBoardPage /> : <AuthPage />}  />
        <Route path='/questions/:question_id' element={isAuth ? <PollPage /> : <AuthPage />}  />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>


  );
}

export default App;
