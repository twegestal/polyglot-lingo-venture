import { Question } from 'api';

export type QuestionProps = {
  questionIndex: number;
  question: Question;
  value: string;
  handleAnswerChange: (value: string) => void;
};
