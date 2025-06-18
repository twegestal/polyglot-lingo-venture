import { Stack, Text, Radio } from '@mantine/core';
import { QuestionProps } from '../../types/questionProps';

export const SingleChoiceQuestion = ({
  questionIndex,
  question,
  value,
  handleAnswerChange,
}: QuestionProps) => {
  return (
    <Stack key={questionIndex}>
      <Text fw={700}>{question.question}</Text>
      <Radio.Group value={value} onChange={(value) => handleAnswerChange(value)}>
        <Stack>
          {question?.options?.map((option, optionIndex) => (
            <Radio key={optionIndex} value={option} label={option} />
          ))}
        </Stack>
      </Radio.Group>
    </Stack>
  );
};
