import { useState } from 'react';
import { Box, Chip, Text } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { failColor } from '../../util/constants';
import { AnswerResult } from '../../types/answer';

type IncorrectAnswerProps = {
  answer: AnswerResult;
};

export const IncorrectAnswer: React.FC<IncorrectAnswerProps> = ({ answer }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  return (
    <Box className='answer-box'>
      <Box display={'flex'}>
        <Box>
          <IconX size={30} color={failColor} />
        </Box>
        <Text ml={10} fw={600}>
          {answer.question}
        </Text>
      </Box>
      <Box>
        <Box display={'flex'}>
          <Text fs={'italic'} mr={6}>
            Your answer:
          </Text>
          <Text>{answer.userAnswer}</Text>
        </Box>

        <Box display={'flex'}>
          <Text fs={'italic'} mr={6} mb={5}>
            Correct answer:
          </Text>
          {!showAnswer ? (
            <>
              <Chip onClick={() => setShowAnswer(true)}>
                <Text>Show</Text>
              </Chip>
            </>
          ) : (
            <>
              <Text>{answer.correctAnswer}</Text>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};
