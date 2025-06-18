import { Route, Routes } from 'react-router-dom';
import { AppLayout } from '../layout/AppLayout';
import { HomePage } from '../../pages/Home.page';
import { QuizzesPage } from '../../pages/Quizzes.page';
import { QuizPage } from '../../pages/Quiz.page';
import { StatsPage } from '../../pages/Stats.page';

export const AppRoutes = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/quizzes' element={<QuizzesPage />} />
        <Route path='/quiz/:id' element={<QuizPage />} />
        <Route path='/stats' element={<StatsPage />} />
      </Routes>
    </AppLayout>
  );
};
