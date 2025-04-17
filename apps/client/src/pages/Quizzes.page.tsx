import { Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { QuizList } from '../components/quiz/QuizList';

export const QuizzesPage = () => {
  const navigate = useNavigate();

  const redirectToQuiz = (id: string) => {
    navigate(`/quiz/${id}`);
  };

  return (
    <>
      <Title>Here are some quizzes:</Title>
      <QuizList redirectToQuiz={redirectToQuiz} />
    </>
  );
};
