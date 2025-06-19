import { useState } from 'react';
import { Button, Paper, Stack, Stepper, rem, Text } from '@mantine/core';
import { Fireworks } from '@fireworks-js/react';
import { SingleChoiceQuestion } from '../components/quiz/SingleChoiceQuestion';
import { FreeTextQuestion } from '../components/quiz/FreeTextQuestion';
import { Result } from '../components/quiz/Result';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuiz, useSubmitQuizResult } from '../hooks/useQuiz';
import { fireworksOptions } from '../util/constants';
import { IconCircleFilled } from '@tabler/icons-react';
import { blueManGroupBlue } from '../util/constants';
import { EvaluationResult, Question } from 'api';

export const QuizPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [evaluationResult, setEvaluationResult] = useState<EvaluationResult | undefined>();
  const [isResultOpen, setIsResultOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: quiz, isLoading, isError } = useQuiz(id);
  const { mutateAsync: submitQuizResult } = useSubmitQuizResult();
  const [active, setActive] = useState(0);

  if (isLoading) return <Text>Loading quiz...</Text>;
  if (isError || !quiz) return <Text>Failed to load quiz.</Text>;

  const handleAnswerChange = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = value;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < quiz.questions.length) {
      setActive(nextIndex);
      setCurrentQuestionIndex(nextIndex);
    }
  };

  const submitAnswers = async () => {
    const nextIndex = currentQuestionIndex + 1;
    setActive(nextIndex);

    const results = evaluateAnswers();
    const score = results.reduce((acc, curr) => acc + (curr.isCorrect ? 1 : 0), 0);
    const maxScore = quiz.questions.length;
    const isPassed = score === maxScore;

    try {
      await submitQuizResult({
        id: quiz.id!,
        score,
        maxScore,
        isPassed,
      });
    } catch (err) {
      console.error('Failed to submit quiz result:', err);
    }

    setEvaluationResult({ results, score });
    setIsResultOpen(true);
  };

  const evaluateAnswers = () => {
    return quiz.questions.map((question, index) => {
      const userAnswer = answers[index]?.toLowerCase() ?? '';
      const correctAnswer = question.correct_answer.toLowerCase();
      const isCorrect = userAnswer === correctAnswer;

      return {
        question: question.question,
        userAnswer,
        correctAnswer,
        isCorrect,
      };
    });
  };

  const closeResults = () => {
    setIsResultOpen(false);
    navigate('/quizzes');
  };

  const renderQuestion = (question: Question) => {
    return question.type === 'single_choice' ? (
      <SingleChoiceQuestion
        questionIndex={currentQuestionIndex}
        question={question}
        value={answers[currentQuestionIndex] || ''}
        handleAnswerChange={handleAnswerChange}
      />
    ) : (
      <FreeTextQuestion
        questionIndex={currentQuestionIndex}
        question={question}
        value={answers[currentQuestionIndex] || ''}
        handleAnswerChange={handleAnswerChange}
      />
    );
  };

  return (
    <>
      {quiz && (
        <Stack maw={800}>
          <Stepper
            styles={{
              stepBody: {
                display: 'none',
              },

              step: {
                padding: 0,
              },

              stepIcon: {
                borderWidth: rem(4),
              },

              separator: {
                marginLeft: rem(-2),
                marginRight: rem(-2),
                height: rem(10),
              },
            }}
            completedIcon={<IconCircleFilled color={blueManGroupBlue} />}
            active={active}
          >
            {quiz.questions.map((_q, index) => (
              <Stepper.Step key={index} />
            ))}
          </Stepper>
          <Paper shadow='sm' radius='md' withBorder p='xl'>
            <Stack>
              {renderQuestion(quiz.questions[currentQuestionIndex])}
              <Button
                onClick={
                  currentQuestionIndex === quiz.questions.length - 1 ? submitAnswers : nextQuestion
                }
              >
                {currentQuestionIndex === quiz.questions.length - 1
                  ? 'Submit answers'
                  : 'Next question'}
              </Button>
            </Stack>
          </Paper>
        </Stack>
      )}
      {evaluationResult && (
        <Result opened={isResultOpen} result={evaluationResult} onClose={closeResults} />
      )}
      {isResultOpen && (
        <Fireworks
          options={fireworksOptions}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        />
      )}
    </>
  );
};
