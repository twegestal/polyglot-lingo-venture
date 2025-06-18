import { supabase } from '../utils/supabase';
import { Quiz, Question, QuizMetadata } from 'api';

export const quizRepository = {
  async getAllQuizzes(userId: string): Promise<QuizMetadata[]> {
    const { data, error } = await supabase
      .from('quizzes')
      .select(
        `
      id,
      title,
      description,
      difficulty,
      language,
      created_at,
      quiz_results (
        status
      )
    `,
      )
      .eq('quiz_results.user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    const mapped = (data ?? []).map((quiz) => ({
      ...quiz,
      status: quiz.quiz_results?.[0]?.status ?? 'neutral',
    }));

    return mapped;
  },

  async getQuizById(quizId: string): Promise<Quiz | null> {
    const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .select('id, title, description, difficulty, language, created_at')
      .eq('id', quizId)
      .single();

    if (quizError || !quiz) return null;

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

    return { ...quiz, questions };
  },

  async saveQuiz(
    title: string,
    description: string,
    difficulty: string,
    language: string,
    questions: Question[],
  ): Promise<string> {
    const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .insert([{ title, description, difficulty, language }])
      .select('id')
      .single();

    if (quizError) throw quizError;

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

      if (q.type === 'single_choice' && q.options) {
        const optionData = q.options.map((option) => ({ question_id: question.id, option }));
        const { error: optionError } = await supabase.from('quiz_options').insert(optionData);
        if (optionError) throw optionError;
      }
    }

    return quiz.id;
  },

  async submitQuizResult(
    userId: string,
    quizId: string,
    score: number,
    maxScore: number,
    status: 'success' | 'fail' | 'neutral',
  ) {
    const { data, error } = await supabase
      .from('quiz_results')
      .upsert(
        [
          {
            user_id: userId,
            quiz_id: quizId,
            score,
            max_score: maxScore,
            status,
          },
        ],
        {
          onConflict: 'user_id,quiz_id',
        },
      )
      .select();

    if (error) throw error;
    return data;
  },
};
