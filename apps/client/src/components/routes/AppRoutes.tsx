import { Route, Routes } from 'react-router-dom';
import { AppLayout } from '../layout/AppLayout';
import { HomePage } from '../../pages/Home.page';
import { QuizzesPage } from '../../pages/Quizzes.page';
import { QuizPage } from '../../pages/Quiz.page';

export const AppRoutes = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/quizzes' element={<QuizzesPage />} />
        <Route path='/quiz/:id' element={<QuizPage />} />
      </Routes>
    </AppLayout>
  );
};
