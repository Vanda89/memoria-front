<script setup lang="ts">
const { flashcard } = useFlashcard(useRoute().params.id as string);

const viewAnswer = ref(false);
</script>

<template>
  <article v-if="flashcard" class="flashcard">
    <p class="flashcard__question">{{ flashcard.flashcard.question }}</p>
    <button @click="viewAnswer = !viewAnswer">
      {{ viewAnswer ? 'Cacher la reponse' : 'Voir la reponse' }}
    </button>
    <p v-show="viewAnswer" class="flashcard__answer">
      {{ flashcard.flashcard.answer }}
    </p>
    <NuxtLink
      class="flashcard__link"
      :to="`/sheets/${flashcard.flashcard.sheetId}`"
      >{{ flashcard.flashcard.sheet?.title }}</NuxtLink
    >
  </article>
</template>

<style scoped></style>
