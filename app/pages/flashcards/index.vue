<script setup lang="ts">
import FlashcardModal from '~/components/FlashcardModal.vue';
import { useFlashcards } from '~/composables/useFlashcards';
import type { Flashcard } from '~/types/flashcard.ts';

const {
  flashcards,
  sheets,
  isSubmitting,
  addFlashcard,
  updateFlashcard,
  deleteFlashcard,
} = useFlashcards();

const openModal = ref(false);
const editingFlashcard = ref<Flashcard | null>(null);

function openEditModal(flashcard: Flashcard) {
  editingFlashcard.value = flashcard;
  openModal.value = true;
}

function closeEditModal() {
  editingFlashcard.value = null;
  openModal.value = false;
}

async function handleSubmit(payload: {
  sheetId: string;
  question: string;
  answer: string;
}) {
  if (editingFlashcard.value) {
    await updateFlashcard(editingFlashcard.value.id, payload);
  } else {
    await addFlashcard(payload);
  }
  closeEditModal();
}
</script>

<template>
  <div v-if="flashcards" class="flashcards-list">
    <article
      v-for="flashcard in flashcards.flashcards"
      :key="flashcard.id"
      class="flashcard"
    >
      <div>
        <p class="flashcard__question">{{ flashcard.question }}</p>
        <button @click="openEditModal(flashcard)">Modifier</button>
        <button @click="deleteFlashcard(flashcard.id)">×</button>
      </div>

      <NuxtLink class="flashcard__link" :to="`/sheets/${flashcard.sheetId}`"
        >Voir la fiche</NuxtLink
      >
    </article>
  </div>

  <button @click="openModal ? closeEditModal() : (openModal = true)">
    {{ openModal ? 'Fermer' : 'Ajouter une carte' }}
  </button>

  <FlashcardModal
    v-if="openModal"
    class="flashcard-modal"
    :sheets="sheets?.sheets ?? []"
    :editing-flashcard="editingFlashcard"
    :is-submitting="isSubmitting"
    @close="closeEditModal"
    @submit="handleSubmit"
  />
</template>

<style scoped></style>
