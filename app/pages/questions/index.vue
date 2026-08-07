<script setup lang="ts">
import { gql } from "graphql-tag";
import type { Question } from "~/types/question.ts";

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
const { data } = await useAsyncQuery<{ questions: Question[] }>(
  GET_QUESTIONS_QUERY,
);
</script>

<template>
  <div class="questions-list" v-if="data">
    <article
      class="question-card"
      v-for="question in data.questions"
      :key="question.id"
    >
      <h2 class="question-card__title">{{ question.question }}</h2>
    </article>
  </div>
</template>

<style scoped></style>
