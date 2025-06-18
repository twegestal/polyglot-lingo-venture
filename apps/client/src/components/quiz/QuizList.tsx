import React from 'react';
import { Divider, List, Text, Title } from '@mantine/core';
import { useQuizzes } from '../../hooks/useQuiz';
import { QuizMetadata } from 'api';
import { difficultyOrder } from '../../util/constants';
import { QuizListItem } from './QuizListItem';

export const QuizList = ({ redirectToQuiz }: { redirectToQuiz: (id: string) => void }) => {
  const { data: quizzes, isLoading, isError } = useQuizzes();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <Text>Failed to load quizzes</Text>;

  const groupByLanguage = (quizzes: QuizMetadata[]) => {
    return quizzes.reduce<Record<string, QuizMetadata[]>>((groups, quiz) => {
      (groups[quiz.language] = groups[quiz.language] || []).push(quiz);
      return groups;
    }, {});
  };

  const sortQuizzesByDifficulty = (quizzes: QuizMetadata[]) => {
    return quizzes.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
  };

  return (
    <List>
      {Object.entries(groupByLanguage(quizzes!)).map(([language, quizzesInLanguage]) => (
        <React.Fragment key={language}>
          <Divider
            size='lg'
            mt='lg'
            mb='md'
            label={<Title order={4}>{language}</Title>}
            labelPosition='left'
            maw={800}
          />

          {sortQuizzesByDifficulty(quizzesInLanguage).map((quiz) => (
            <QuizListItem key={quiz.id} quiz={quiz} redirectToQuiz={redirectToQuiz} />
          ))}
        </React.Fragment>
      ))}
    </List>
  );
};
