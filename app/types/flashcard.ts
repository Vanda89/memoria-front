export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  sheetId: string;
}

export interface FlashcardDetail extends Flashcard {
  sheet?: {
    title: string;
  };
}
