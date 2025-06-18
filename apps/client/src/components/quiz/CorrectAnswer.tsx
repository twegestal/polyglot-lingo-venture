import { Box, Text } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { successColor } from '../../util/constants';
import { AnswerResult } from '../../types/answer';

type CorrectAnswerProps = {
  answer: AnswerResult;
};

export const CorrectAnswer: React.FC<CorrectAnswerProps> = ({ answer }) => {
  return (
    <Box className='answer-box'>
      <Box display={'flex'}>
        <Box>
          <IconCheck size={30} color={successColor} />
        </Box>
        <Text ml={10} fw={600}>
          {answer.question}
        </Text>
      </Box>

      <Box display={'flex'}>
        <Text fs={'italic'} mr={6}>
          Correct answer:
        </Text>
        <Text>{answer.userAnswer}</Text>
      </Box>
    </Box>
  );
};
