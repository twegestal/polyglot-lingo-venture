import { Stack, Text, Input } from '@mantine/core';
import { QuestionProps } from '../../types/questionProps';

export const FreeTextQuestion = ({
  questionIndex,
  question,
  value,
  handleAnswerChange,
}: QuestionProps) => {
  return (
    <Stack key={questionIndex}>
      <Text fw={700}>{question.question}</Text>
      <Input
        placeholder='Answer...'
        value={value}
        onChange={(e) => handleAnswerChange(e.target.value)}
      />
    </Stack>
  );
};
