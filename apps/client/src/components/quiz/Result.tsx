import React from 'react';
import { Stack, Modal, Button } from '@mantine/core';
import { CorrectAnswer } from './CorrectAnswer';
import { IncorrectAnswer } from './IncorrectAnswer';
import '../styles.css';

export const Result = ({ opened, result: { results, score }, onClose }) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      padding={20}
      title={`You got ${score} out of ${results.length} points`}
      className={'modal'}
    >
      <Stack>
        {results.map((answer, index) => (
          <React.Fragment key={index}>
            {answer.isCorrect ? (
              <CorrectAnswer answer={answer} />
            ) : (
              <IncorrectAnswer answer={answer} />
            )}
          </React.Fragment>
        ))}
        <Button onClick={onClose}>Close</Button>
      </Stack>
    </Modal>
  );
};
