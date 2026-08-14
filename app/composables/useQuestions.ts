export function useQuestions() {
  const isSubmitting = ref(false);

  const GET_QUESTIONS_QUERY = gql`
    query GetQuestions {
      questions {
        id
        question
        correctAnswer
        choices
        quizId
      }
    }
  `;
  const { data: questions, refresh: refreshQuestions } = useAsyncQuery<{
    questions: Question[];
  }>(GET_QUESTIONS_QUERY);

  const CREATE_QUESTION_MUTATION = gql`
    mutation CreateQuestion($createQuestionInput: CreateQuestionInput!) {
      createQuestion(createQuestionInput: $createQuestionInput) {
        question
        correctAnswer
        choices
        quizId
      }
    }
  `;

  const { mutate: mutateAddQuestion } = useApolloMutation(
    CREATE_QUESTION_MUTATION,
  );

  const UPDATE_QUESTION_MUTATION = gql`
    mutation UpdateQuestion(
      $id: ID!
      $updateQuestionInput: UpdateQuestionInput!
    ) {
      updateQuestion(id: $id, updateQuestionInput: $updateQuestionInput) {
        id
        question
        correctAnswer
        choices
        quizId
      }
    }
  `;

  const { mutate: mutateUpdateQuestion } = useApolloMutation(
    UPDATE_QUESTION_MUTATION,
  );

  const DELETE_QUESTION_MUTATION = gql`
    mutation DeleteQuestion($id: ID!) {
      removeQuestion(id: $id)
    }
  `;

  const { mutate: mutateDeleteQuestion } = useApolloMutation(
    DELETE_QUESTION_MUTATION,
  );

  async function addQuestion(payload: {
    question: string;
    correctAnswer: string;
    choices: string[];
    quizId: string;
  }) {
    if (isSubmitting.value) return;
    isSubmitting.value = true;
    try {
      await mutateAddQuestion({
        variables: {
          createQuestionInput: {
            question: payload.question,
            correctAnswer: payload.correctAnswer,
            choices: payload.choices,
            quizId: payload.quizId,
          },
        },
        awaitRefetchQueries: true,
        refetchQueries: [
          {
            query: GET_QUESTIONS_QUERY,
          },
        ],
      });
      await refreshQuestions();
    } catch (error) {
      console.error('Error adding question:', error);
    } finally {
      isSubmitting.value = false;
    }
  }

  async function updateQuestion(
    id: string,
    payload: {
      question: string;
      correctAnswer: string;
      choices: string[];
      quizId: string;
    },
  ) {
    if (isSubmitting.value) return;
    isSubmitting.value = true;
    try {
      await mutateUpdateQuestion({
        variables: {
          id,
          updateQuestionInput: {
            question: payload.question,
            correctAnswer: payload.correctAnswer,
            choices: payload.choices,
            quizId: payload.quizId,
          },
        },
        awaitRefetchQueries: true,
        refetchQueries: [
          {
            query: GET_QUESTIONS_QUERY,
          },
        ],
      });
      await refreshQuestions();
    } catch (error) {
      console.error('Error updating question:', error);
    } finally {
      isSubmitting.value = false;
    }
  }

  async function deleteQuestion(id: string) {
    try {
      await mutateDeleteQuestion({
        variables: { id },
        awaitRefetchQueries: true,
        refetchQueries: [
          {
            query: GET_QUESTIONS_QUERY,
          },
        ],
      });
      await refreshQuestions();
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  }

  return {
    questions,
    isSubmitting,
    addQuestion,
    updateQuestion,
    deleteQuestion,
  };
}

export function useQuestion(id: string) {
  const GET_QUESTION_QUERY = gql`
    query GetQuestion($id: ID!) {
      question(id: $id) {
        id
        question
        correctAnswer
        choices
        quizId
        quiz {
          title
          questions {
            id
          }
        }
      }
    }
  `;
  const { data } = useAsyncQuery<{ question: QuestionDetail }>(
    GET_QUESTION_QUERY,
    {
      id: id,
    },
  );
  const question = computed(() => data.value?.question ?? null);

  return { question };
}
