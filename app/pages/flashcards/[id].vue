<script setup lang="ts">
import { gql } from 'graphql-tag';
import type { FlashcardDetail } from '~/types/flashcard.ts';

const GET_FLASHCARD_QUERY = gql`
  query GetFlashcard($id: ID!) {
    flashcard(id: $id) {
      id
      question
      answer
      sheetId
      sheet {
        title
      }
    }
  }
`;
const { data } = await useAsyncQuery<{ flashcard: FlashcardDetail }>(
  GET_FLASHCARD_QUERY,
  {
    id: useRoute().params.id,
  },
);

const viewAnswer = ref(false);
</script>

<template>
  <article v-if="data" class="flashcard">
    <p class="flashcard__question">{{ data.flashcard.question }}</p>
    <button @click="viewAnswer = !viewAnswer">
      {{ viewAnswer ? 'Cacher la reponse' : 'Voir la reponse' }}
    </button>
    <p v-show="viewAnswer" class="flashcard__answer">
      {{ data.flashcard.answer }}
    </p>
    <NuxtLink
      class="flashcard__link"
      :to="`/sheets/${data.flashcard.sheetId}`"
      >{{ data.flashcard.sheet?.title }}</NuxtLink
    >
  </article>
</template>

<style scoped></style>
