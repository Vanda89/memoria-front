<script setup lang="ts">
const route = useRoute();
const quizId = String(route.params.id);
const { quiz } = useQuiz(quizId);
</script>

<template>
  <article v-if="quiz" class="quiz-detail">
    <h1 class="quiz-detail__title">{{ quiz.title }}</h1>
    <div v-for="question in quiz.questions" :key="question.id">
      <p>{{ question.question }}</p>
    </div>
    <NuxtLink class="quiz-detail__link" :to="`/sheets/${quiz.sheetId}`">{{
      quiz.sheet?.title
    }}</NuxtLink>
  </article>
</template>

<style scoped></style>
