<script setup lang="ts">
import { gql } from 'graphql-tag';
import type { QuizDetail } from '~/types/quiz.ts';

const GET_QUIZ_QUERY = gql`
  query GetQuiz($id: ID!) {
    quiz(id: $id) {
      id
      title
      sheetId
      sheet {
        title
      }
    }
  }
`;
const { data } = await useAsyncQuery<{ quiz: QuizDetail }>(GET_QUIZ_QUERY, {
  id: useRoute().params.id,
});
</script>

<template>
  <article v-if="data" class="quiz-detail">
    <h1 class="quiz-detail__title">{{ data.quiz.title }}</h1>
    <NuxtLink class="quiz-detail__link" :to="`/sheets/${data.quiz.sheetId}`">{{
      data.quiz.sheet?.title
    }}</NuxtLink>
  </article>
</template>

<style scoped></style>
