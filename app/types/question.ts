export interface Question {
  id: string;
  quizId: string;
  question: string;
  correctAnswer: string;
  choices: string[];
}

export interface QuestionDetail extends Question {
  quiz?: {
    title: string;
    questions?: { id: string }[];
  };
}
