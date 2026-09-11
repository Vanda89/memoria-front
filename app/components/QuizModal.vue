<script setup lang="ts">
const props = defineProps<{
  sheets: Sheet[];
  editingQuiz: Quiz | null;
  isSubmitting: boolean;
}>();

const selectedSheet = ref(props.editingQuiz?.sheetId ?? '');
const title = ref(props.editingQuiz?.title ?? '');

defineEmits<{
  close: [];
  submit: [payload: { sheetId: string; title: string }];
}>();
</script>

<template>
  <Teleport to="body">
    <button
      class="overlay"
      aria-label="Fermer la modale"
      @click="$emit('close')"
    ></button>
    <div v-if="sheets" class="modal">
      <h2>Ajouter un quiz</h2>
      <label for="quiz-sheet">Fiche</label>
      <select id="quiz-sheet" v-model="selectedSheet">
        <option v-for="sheet in sheets" :key="sheet.id" :value="sheet.id">
          {{ sheet.title }}
        </option>
      </select>
      <label for="quiz-title">Titre</label>
      <input id="quiz-title" v-model="title" type="text" placeholder="Titre" />
      <button
        :disabled="isSubmitting"
        @click="$emit('submit', { sheetId: selectedSheet, title })"
      >
        {{ editingQuiz ? 'Modifier' : 'Ajouter' }}
      </button>
    </div>
  </Teleport>
</template>

<style scoped></style>
