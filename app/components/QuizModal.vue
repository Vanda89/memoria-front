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
    <div class="overlay" @click="$emit('close')"></div>
    <div v-if="sheets" class="modal">
      <h2>Ajouter un quiz</h2>
      <select v-model="selectedSheet">
        <option v-for="sheet in sheets" :key="sheet.id" :value="sheet.id">
          {{ sheet.title }}
        </option>
      </select>
      <input v-model="title" type="text" placeholder="Titre" />
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
