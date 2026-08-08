<script setup lang="ts">
import { gql } from 'graphql-tag';
import type { Quiz } from '~/types/quiz.ts';

const GET_QUIZZES_QUERY = gql`
  query GetQuizzes {
    quizzes {
      id
      title
      sheetId
    }
  }
`;
const { data } = await useAsyncQuery<{ quizzes: Quiz[] }>(GET_QUIZZES_QUERY);
</script>

<template>
  <div v-if="data" class="quizzes-list">
    <article v-for="quiz in data.quizzes" :key="quiz.id" class="quiz-card">
      <h2 class="quiz-card__title">{{ quiz.title }}</h2>
    </article>
  </div>
</template>

<style scoped></style>
