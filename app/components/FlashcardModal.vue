<script setup lang="ts">
const props = defineProps<{
  sheets: Sheet[];
  editingFlashcard: Flashcard | null;
  isSubmitting: boolean;
}>();

const selectedSheet = ref(props.editingFlashcard?.sheetId ?? '');
const question = ref(props.editingFlashcard?.question ?? '');
const answer = ref(props.editingFlashcard?.answer ?? '');

defineEmits<{
  close: [];
  submit: [payload: { sheetId: string; question: string; answer: string }];
}>();
</script>

<template>
  <Teleport to="body">
    <div class="overlay" @click="$emit('close')"></div>
    <div v-if="sheets" class="modal">
      <h2>Ajouter une carte</h2>
      <select v-model="selectedSheet">
        <option v-for="sheet in sheets" :key="sheet.id" :value="sheet.id">
          {{ sheet.title }}
        </option>
      </select>
      <input v-model="question" type="text" placeholder="Question" />
      <input v-model="answer" type="text" placeholder="Réponse" />
      <button
        :disabled="isSubmitting"
        @click="$emit('submit', { sheetId: selectedSheet, question, answer })"
      >
        {{ editingFlashcard ? 'Modifier' : 'Ajouter' }}
      </button>
    </div>
  </Teleport>
</template>

<style scoped></style>
