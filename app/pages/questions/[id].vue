<script setup lang="ts">
import { gql } from "graphql-tag";
import type { QuestionDetail } from "~/types/question.ts";

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
      }
    }
  }
`;
const { data } = await useAsyncQuery<{ question: QuestionDetail }>(
  GET_QUESTION_QUERY,
  {
    id: useRoute().params.id,
  },
);
const viewCorrectAnswer = ref(false);
</script>

<template>
  <article class="question-detail" v-if="data">
    <h1 class="question-detail__title">{{ data.question.question }}</h1>
    <ul class="question-detail__choices">
      <li
        class="question-detail__choice"
        v-for="choice in data.question.choices"
        :key="choice"
      >
        {{ choice }}
      </li>
    </ul>
    <button @click="viewCorrectAnswer = !viewCorrectAnswer">
      {{
        viewCorrectAnswer
          ? "Cacher la bonne reponse"
          : "Afficher la bonne reponse"
      }}
    </button>
    <p class="question-detail__correct-answer" v-if="viewCorrectAnswer">
      {{ data.question.correctAnswer }}
    </p>
    <NuxtLink
      class="question-detail__link"
      :to="`/quizzes/${data.question.quizId}`"
      >{{ data.question.quiz?.title }}</NuxtLink
    >
  </article>
</template>

<style scoped></style>
