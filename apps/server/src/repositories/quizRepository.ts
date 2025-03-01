import { supabase } from '../utils/supabase';
import { Quiz, Question } from 'api';

export const quizRepository = {
  // Fetch all quizzes (metadata only)
  async getAllQuizzes(): Promise<Quiz[]> {
    const { data, error } = await supabase
      .from('quizzes')
      .select('id, title, description, difficulty, language, created_at')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Quiz[];
  },

  // Fetch a single quiz with its questions
  async getQuizById(quizId: string): Promise<{ quiz: Quiz; questions: Question[] } | null> {
    const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .select('id, title, description, difficulty, language, created_at')
      .eq('id', quizId)
      .single();

    if (quizError) return null;

    const { data: rawQuestions, error: questionError } = await supabase
      .from('quiz_questions')
      .select('id, quiz_id, question, type, correct_answer')
      .eq('quiz_id', quizId);

    if (questionError) return null;

    const questions: Question[] = [];

    for (const q of rawQuestions) {
      const question: Question = {
        id: q.id,
        quiz_id: q.quiz_id,
        question: q.question,
        type: q.type,
        correct_answer: q.correct_answer,
      };

      if (q.type === 'single_choice') {
        const { data: options, error: optionError } = await supabase
          .from('quiz_options')
          .select('option')
          .eq('question_id', q.id);

        if (optionError) return null;

        question.options = options.map((o) => o.option);
      }

      questions.push(question);
    }

    return { quiz, questions };
  },

  // Store a new quiz
  async saveQuiz(
    title: string,
    description: string,
    difficulty: string,
    language: string,
    questions: Question[],
  ): Promise<string> {
    // Insert quiz metadata
    const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .insert([{ title, description, difficulty, language }])
      .select('id')
      .single();

    if (quizError) throw quizError;

    // Insert questions
    for (const q of questions) {
      const { data: question, error: questionError } = await supabase
        .from('quiz_questions')
        .insert([
          {
            quiz_id: quiz.id,
            question: q.question,
            type: q.type,
            correct_answer: q.correct_answer,
          },
        ])
        .select('id')
        .single();

      if (questionError) throw questionError;

      // Insert options for single_choice questions
      if (q.type === 'single_choice' && q.options) {
        const optionData = q.options.map((option) => ({ question_id: question.id, option }));
        const { error: optionError } = await supabase.from('quiz_options').insert(optionData);
        if (optionError) throw optionError;
      }
    }

    return quiz.id;
  },
};
