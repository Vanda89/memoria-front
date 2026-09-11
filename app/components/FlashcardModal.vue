<script setup lang="ts">
const props = defineProps<{
  sheets: Sheet[];
  editingFlashcard: Flashcard | null;
  isSubmitting: boolean;
}>();

const form = reactive({
  selectedSheet: props.editingFlashcard?.sheetId ?? '',
  question: props.editingFlashcard?.question ?? '',
  answer: props.editingFlashcard?.answer ?? '',
});

const emit = defineEmits<{
  close: [];
  submit: [payload: { sheetId: string; question: string; answer: string }];
}>();
</script>

<template>
  <Teleport to="body">
    <button
      type="button"
      class="overlay"
      aria-label="Fermer la modale"
      @click="emit('close')"
    ></button>
    <div
      v-if="sheets"
      class="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="flashcard-modal-title"
    >
      <h2 id="flashcard-modal-title">Ajouter une carte</h2>
      <label>
        Fiche
        <select v-model="form.selectedSheet">
          <option v-for="sheet in sheets" :key="sheet.id" :value="sheet.id">
            {{ sheet.title }}
          </option>
        </select>
      </label>
      <label for="question-input">
        Question
        <input
          id="question-input"
          v-model="form.question"
          type="text"
          name="question"
        />
      </label>
      <label for="answer-input">
        Réponse
        <input
          id="answer-input"
          v-model="form.answer"
          type="text"
          name="answer"
        />
      </label>
      <button
        type="button"
        :disabled="isSubmitting"
        @click="
          emit('submit', {
            sheetId: form.selectedSheet,
            question: form.question,
            answer: form.answer,
          })
        "
      >
        {{ editingFlashcard ? 'Modifier' : 'Ajouter' }}
      </button>
    </div>
  </Teleport>
</template>

<style scoped></style>
