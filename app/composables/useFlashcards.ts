import { gql } from "graphql-tag";
import type { Flashcard } from "~/types/flashcard.ts";
import type { Sheet } from "~/types/sheet";

export function useFlashcards() {
  const isSubmitting = ref(false);

  const GET_FLASHCARDS_QUERY = gql`
    query GetFlashcards {
      flashcards {
        id
        question
        answer
        sheetId
      }
    }
  `;
  const { data: flashcards, refresh: refreshFlashcards } = useAsyncQuery<{
    flashcards: Flashcard[];
  }>(GET_FLASHCARDS_QUERY);

  const GET_SHEETS_QUERY = gql`
    query GetSheets {
      sheets {
        id
        title
      }
    }
  `;
  const { data: sheets } = useAsyncQuery<{ sheets: Sheet[] }>(
    GET_SHEETS_QUERY,
  );

  const CREATE_FLASHCARD_MUTATION = gql`
    mutation CreateFlashCard($createFlashcardInput: CreateFlashcardInput!) {
      createFlashcard(createFlashcardInput: $createFlashcardInput) {
        sheetId
        question
        answer
      }
    }
  `;

  const { mutate: mutateAddFlashcard } = useApolloMutation(
    CREATE_FLASHCARD_MUTATION,
  );

  const UPDATE_FLASHCARD_MUTATION = gql`
    mutation UpdateFlashCard(
      $id: ID!
      $updateFlashcardInput: UpdateFlashcardInput!
    ) {
      updateFlashcard(id: $id, updateFlashcardInput: $updateFlashcardInput) {
        id
        sheetId
        question
        answer
      }
    }
  `;
  const { mutate: mutateUpdateFlashcard } = useApolloMutation(
    UPDATE_FLASHCARD_MUTATION,
  );

  const DELETE_FLASHCARD_MUTATION = gql`
    mutation DeleteFlashcard($id: ID!) {
      removeFlashcard(id: $id)
    }
  `;
  const { mutate: mutateDeleteFlashcard } = useApolloMutation(
    DELETE_FLASHCARD_MUTATION,
  );

  async function addFlashcard(payload: {
    sheetId: string;
    question: string;
    answer: string;
  }) {
    if (isSubmitting.value) return;
    isSubmitting.value = true;
    try {
      await mutateAddFlashcard({
        variables: {
          createFlashcardInput: {
            sheetId: payload.sheetId,
            question: payload.question,
            answer: payload.answer,
          },
        },
        awaitRefetchQueries: true,
        refetchQueries: [
          {
            query: GET_FLASHCARDS_QUERY,
          },
        ],
      });
      refreshFlashcards();
    } finally {
      isSubmitting.value = false;
    }
  }

  async function updateFlashcard(
    id: string,
    payload: {
      sheetId: string;
      question: string;
      answer: string;
    },
  ) {
    if (isSubmitting.value) return;
    isSubmitting.value = true;
    try {
      await mutateUpdateFlashcard({
        variables: {
          id,
          updateFlashcardInput: {
            sheetId: payload.sheetId,
            question: payload.question,
            answer: payload.answer,
          },
        },
        awaitRefetchQueries: true,
        refetchQueries: [
          {
            query: GET_FLASHCARDS_QUERY,
          },
        ],
      });
      refreshFlashcards();
    } finally {
      isSubmitting.value = false;
    }
  }

  async function deleteFlashcard(id: string) {
    await mutateDeleteFlashcard({
      variables: {
        id,
      },
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: GET_FLASHCARDS_QUERY,
        },
      ],
    });
    refreshFlashcards();
  }

  return {
    flashcards,
    sheets,
    isSubmitting,
    addFlashcard,
    updateFlashcard,
    deleteFlashcard,
  };
}
