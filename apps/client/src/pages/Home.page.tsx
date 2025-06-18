// HomePage.tsx
import { Text, Stack, LoadingOverlay, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizCreator } from '../components/quiz/QuizCreator';
import { useCreateQuiz } from '../hooks/useQuiz';

export const HomePage = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const { mutateAsync: createQuiz } = useCreateQuiz();

  const handleCreate = async (language: string, difficulty: string) => {
    setVisible(true);
    try {
      const newQuiz = await createQuiz({ language, difficulty });
      navigate(`/quiz/${newQuiz.id}`);
    } catch (error) {
      notifications.show({
        title: 'Quiz generation failed',
        message: 'Something went wrong. Please try again.',
        color: 'red',
      });
    } finally {
      setVisible(false);
    }
  };

  return (
    <>
      <LoadingOverlay visible={visible} />
      <Stack>
        <Title order={1}>Welcome to the Polyglot Lingo Venture</Title>
        <Text>
          You can browse between different quizzes in the menu or create a new quiz below.
        </Text>
        <QuizCreator onCreate={handleCreate} />
      </Stack>
    </>
  );
};
