import { IconX, IconCheck, IconMinus } from '@tabler/icons-react';
import '../../styles/ComponentStyles.css';
import beginnerLogo from '../../assets/beginner.svg';
import intermediateLogo from '../../assets/intermediate.svg';
import advancedLogo from '../../assets/advanced.svg';
import { QuizMetadata } from 'api';
import { Box, Button, Flex, Group, Image, Spoiler, Text, Tooltip } from '@mantine/core';
import { failColor, successColor } from '../../util/constants';
import { capitalizeFirstLetter } from '../../util/utils';

export const QuizListItem = ({
  quiz,
  redirectToQuiz,
}: {
  quiz: QuizMetadata;
  redirectToQuiz: (id: string) => void;
}) => {
  return (
    <Box className='quiz-list-item' data-id={quiz.id} key={quiz.title}>
      <Flex>
        <Box mr={10}>
          {quiz.status === 'success' ? (
            <IconCheck size={30} color={successColor} />
          ) : quiz.status === 'fail' ? (
            <IconX size={30} color={failColor} />
          ) : (
            <IconMinus size={30} color='gray' />
          )}
        </Box>
        <Box>
          <Text>{quiz.title}</Text>
          <Flex>
            <Text size='sm' c='dimmed' fw={400} mr={5}>
              Difficulty:
            </Text>
            <Group>
              <Tooltip label={capitalizeFirstLetter(quiz.difficulty)}>
                <Image
                  src={
                    quiz.difficulty === 'beginner'
                      ? beginnerLogo
                      : quiz.difficulty === 'intermediate'
                        ? intermediateLogo
                        : advancedLogo
                  }
                  w={60}
                />
              </Tooltip>
            </Group>
          </Flex>
          <Spoiler maxHeight={24} showLabel='Show more' hideLabel='Hide' className='spoiler-label'>
            <Text size='sm' c='dimmed' fw={400}>
              {quiz.description}
            </Text>
          </Spoiler>
        </Box>
      </Flex>
      <Box mr={6} ml={6} className='button-box'>
        <Button variant='outline' onClick={() => redirectToQuiz(quiz.id!)} fullWidth>
          {quiz.status === 'neutral' ? 'Start' : 'Try again'}
        </Button>
      </Box>
    </Box>
  );
};
