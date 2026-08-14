export function useQuizzes() {
  const isSubmitting = ref(false);

  const GET_QUIZZES_QUERY = gql`
    query GetQuizzes {
      quizzes {
        id
        sheetId
        title
      }
    }
  `;
  const { data: quizzes, refresh: refreshQuizzes } = useAsyncQuery<{
    quizzes: Quiz[];
  }>(GET_QUIZZES_QUERY);

  const CREATE_QUIZ_MUTATION = gql`
    mutation CreateQuiz($createQuizInput: CreateQuizInput!) {
      createQuiz(createQuizInput: $createQuizInput) {
        sheetId
        title
      }
    }
  `;

  const { mutate: mutateAddQuiz } = useApolloMutation(CREATE_QUIZ_MUTATION);

  const UPDATE_QUIZ_MUTATION = gql`
    mutation UpdateQuiz($id: ID!, $updateQuizInput: UpdateQuizInput!) {
      updateQuiz(id: $id, updateQuizInput: $updateQuizInput) {
        id
        sheetId
        title
      }
    }
  `;
  const { mutate: mutateUpdateQuiz } = useApolloMutation(UPDATE_QUIZ_MUTATION);

  const DELETE_QUIZ_MUTATION = gql`
    mutation DeleteQuiz($id: ID!) {
      removeQuiz(id: $id)
    }
  `;
  const { mutate: mutateDeleteQuiz } = useApolloMutation(DELETE_QUIZ_MUTATION);

  async function addQuiz(payload: { sheetId: string; title: string }) {
    if (isSubmitting.value) return;
    isSubmitting.value = true;
    try {
      await mutateAddQuiz({
        variables: {
          createQuizInput: {
            sheetId: payload.sheetId,
            title: payload.title,
          },
        },
        awaitRefetchQueries: true,
        refetchQueries: [
          {
            query: GET_QUIZZES_QUERY,
          },
        ],
      });
      await refreshQuizzes();
    } catch (error) {
      console.error('Error adding quiz:', error);
    } finally {
      isSubmitting.value = false;
    }
  }

  async function updateQuiz(
    id: string,
    payload: { sheetId: string; title: string },
  ) {
    if (isSubmitting.value) return;
    isSubmitting.value = true;
    try {
      await mutateUpdateQuiz({
        variables: {
          id,
          updateQuizInput: {
            sheetId: payload.sheetId,
            title: payload.title,
          },
        },
        awaitRefetchQueries: true,
        refetchQueries: [
          {
            query: GET_QUIZZES_QUERY,
          },
        ],
      });
      await refreshQuizzes();
    } catch (error) {
      console.error('Error updating quiz', error);
    } finally {
      isSubmitting.value = false;
    }
  }

  async function deleteQuiz(id: string) {
    await mutateDeleteQuiz({
      variables: {
        id,
      },
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: GET_QUIZZES_QUERY,
        },
      ],
    });
    await refreshQuizzes();
  }

  return {
    quizzes,
    isSubmitting,
    addQuiz,
    updateQuiz,
    deleteQuiz,
  };
}

export function useQuiz(id: string) {
  const GET_QUIZ_QUERY = gql`
    query GetQuiz($id: ID!) {
      quiz(id: $id) {
        id
        title
        sheetId
        sheet {
          title
        }
        questions {
          id
          question
          correctAnswer
          choices
        }
      }
    }
  `;
  const { data } = useAsyncQuery<{ quiz: QuizDetail }>(GET_QUIZ_QUERY, {
    id: id,
  });

  const quiz = computed(() => data.value?.quiz ?? null);

  return { quiz };
}
