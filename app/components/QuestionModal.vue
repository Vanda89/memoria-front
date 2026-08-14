<script setup lang="ts">
const props = defineProps<{
  quizzes: Quiz[];
  editingQuestion: Question | null;
  isSubmitting: boolean;
}>();

const selectedQuiz = ref(props.editingQuestion?.quizId ?? '');
const question = ref(props.editingQuestion?.question ?? '');
const choices = ref(props.editingQuestion?.choices ?? ['', '', '', '']);
const correctAnswer = ref(props.editingQuestion?.correctAnswer ?? '');

defineEmits<{
  close: [];
  submit: [
    payload: {
      quizId: string;
      question: string;
      choices: string[];
      correctAnswer: string;
    },
  ];
}>();
</script>

<template>
  <Teleport to="body">
    <div class="overlay" @click="$emit('close')"></div>
    <div v-if="quizzes" class="modal">
      <h2>Ajouter une question</h2>
      <select v-model="selectedQuiz">
        <option v-for="quiz in quizzes" :key="quiz.id" :value="quiz.id">
          {{ quiz.title }}
        </option>
      </select>
      <input v-model="question" type="text" placeholder="Question" />
      <div v-for="(choice, index) in choices" :key="index">
        <input
          v-model="choices[index]"
          type="text"
          :placeholder="'Choix ' + (index + 1)"
        />
      </div>
      <input v-model="correctAnswer" type="text" placeholder="Bonne réponse" />
      <button
        :disabled="isSubmitting"
        @click="
          $emit('submit', {
            quizId: selectedQuiz,
            question,
            choices,
            correctAnswer,
          })
        "
      >
        {{ editingQuestion ? 'Modifier' : 'Ajouter' }}
      </button>
    </div>
  </Teleport>
</template>

<style scoped></style>
