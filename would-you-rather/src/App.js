import './App.css';
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from './components/Layout/Header';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import NewQuestionPage from './pages/NewQuestionPage'
import LeaderBoardPage from './pages/LeaderBoardPage';
import { useSelector } from 'react-redux';
import AnsweredItem from './components/question/AnsweredItem';
import { ProtectedLayout } from './components/Auth/ProtectedLayout';
import { AuthProvider } from './hooks/useAuth';


const App = () => {

  return (
    <AuthProvider>
      <div className="App">
        <Header />
        <Routes>
          <Route element={<ProtectedLayout />}>
            <Route path='home' element={<HomePage />} />
            <Route path='add' element={<NewQuestionPage />} />
            <Route path='leaderboard' element={<LeaderBoardPage />} />
            <Route path='questions/:question_id' element={<AnsweredItem />} />
          </Route>
          <Route path='/login' element={<AuthPage />} ></Route>
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
