<script setup lang="ts">
import type { Flashcard } from "~/types/flashcard.ts";
import type { Sheet } from "~/types/sheet";

const props = defineProps<{
  sheets: Sheet[];
  editingFlashcard: Flashcard | null;
  isSubmitting: boolean;
}>();

const selectedSheet = ref(props.editingFlashcard?.sheetId ?? "");
const question = ref(props.editingFlashcard?.question ?? "");
const answer = ref(props.editingFlashcard?.answer ?? "");

defineEmits<{
  close: [];
  submit: [payload: { sheetId: string; question: string; answer: string }];
}>();
</script>

<template>
  <Teleport to="body">
    <div class="overlay" @click="$emit('close')"></div>
    <div class="modal" v-if="sheets">
      <h2>Ajouter une carte</h2>
      <select v-model="selectedSheet">
        <option :value="sheet.id" v-for="sheet in sheets" :key="sheet.id">
          {{ sheet.title }}
        </option>
      </select>
      <input type="text" placeholder="Question" v-model="question" />
      <input type="text" placeholder="Réponse" v-model="answer" />
      <button
        @click="$emit('submit', { sheetId: selectedSheet, question, answer })"
        :disabled="isSubmitting"
      >
        {{ editingFlashcard ? "Modifier" : "Ajouter" }}
      </button>
    </div>
  </Teleport>
</template>

<style scoped></style>
