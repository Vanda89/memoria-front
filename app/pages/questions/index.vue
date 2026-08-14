<script setup lang="ts">
const { quizzes } = useQuizzes();
const { questions, isSubmitting, addQuestion, updateQuestion, deleteQuestion } =
  useQuestions();

const openModal = ref(false);
const editingQuestion = ref<Question | null>(null);

function openEditModal(question: Question) {
  editingQuestion.value = question;
  openModal.value = true;
}

function closeEditModal() {
  editingQuestion.value = null;
  openModal.value = false;
}

async function handleSubmit(payload: {
  quizId: string;
  question: string;
  choices: string[];
  correctAnswer: string;
}) {
  if (editingQuestion.value) {
    await updateQuestion(editingQuestion.value.id, payload);
  } else {
    await addQuestion(payload);
  }
  closeEditModal();
}
</script>

<template>
  <div v-if="questions" class="questions-list">
    <article
      v-for="question in questions.questions"
      :key="question.id"
      class="question-card"
    >
      <h2 class="question-card__title">{{ question.question }}</h2>
      <div>
        <button @click="openEditModal(question)">Modifier</button>
        <button @click="deleteQuestion(question.id)">X</button>
      </div>

      <NuxtLink class="question-card__link" :to="`/quizzes/${question.quizId}`"
        >Voir le quiz</NuxtLink
      >
    </article>
  </div>
  <button @click="openModal ? closeEditModal() : (openModal = true)">
    {{ openModal ? 'Fermer' : 'Ajouter une question' }}
  </button>

  <QuestionModal
    v-if="openModal"
    class="question-modal"
    :quizzes="quizzes?.quizzes ?? []"
    :editing-question="editingQuestion"
    :is-submitting="isSubmitting"
    @close="closeEditModal"
    @submit="handleSubmit"
  />
</template>

<style scoped></style>
