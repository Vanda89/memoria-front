export interface Quiz {
  id: string;
  sheetId: string;
  title: string;
}

export interface QuizDetail extends Quiz {
  sheet?: {
    title: string;
  };
  questions?: Question[];
}
