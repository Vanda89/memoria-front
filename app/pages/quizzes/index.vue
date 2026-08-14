<script setup lang="ts">
const { sheets } = useSheets();
const { quizzes, isSubmitting, addQuiz, updateQuiz, deleteQuiz } = useQuizzes();

const openModal = ref(false);
const editingQuiz = ref<Quiz | null>(null);

function openEditModal(quiz: Quiz) {
  editingQuiz.value = quiz;
  openModal.value = true;
}

function closeEditModal() {
  editingQuiz.value = null;
  openModal.value = false;
}

async function handleSubmit(payload: { sheetId: string; title: string }) {
  if (editingQuiz.value) {
    await updateQuiz(editingQuiz.value.id, payload);
  } else {
    await addQuiz(payload);
  }
  closeEditModal();
}
</script>

<template>
  <div v-if="quizzes" class="quizzes-list">
    <article v-for="quiz in quizzes.quizzes" :key="quiz.id" class="quiz">
      <h2 class="quiz-card__title">{{ quiz.title }}</h2>
      <div>
        <button @click="openEditModal(quiz)">Modifier</button>
        <button @click="deleteQuiz(quiz.id)">X</button>
      </div>

      <NuxtLink class="quiz__link" :to="`/sheets/${quiz.sheetId}`"
        >Voir la fiche</NuxtLink
      >
    </article>
  </div>
  <button @click="openModal ? closeEditModal() : (openModal = true)">
    {{ openModal ? 'Fermer' : 'Ajouter un quiz' }}
  </button>

  <QuizModal
    v-if="openModal"
    class="quiz-modal"
    :sheets="sheets?.sheets ?? []"
    :editing-quiz="editingQuiz"
    :is-submitting="isSubmitting"
    @close="closeEditModal"
    @submit="handleSubmit"
  />
</template>

<style scoped></style>
