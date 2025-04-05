import { Text, Stack, LoadingOverlay, Title } from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizCreator } from '../components/quiz/QuizCreator';

export const HomePage = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <LoadingOverlay visible={visible} />
      <Stack>
        <Title order={1}>Welcome to the Polyglot Lingo Venture</Title>
        <Text>
          You can browse between different quizzes in the menu or create a new quiz below.
        </Text>
        <QuizCreator />
      </Stack>
    </>
  );
};
