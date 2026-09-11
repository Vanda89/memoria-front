<script setup lang="ts">
type QuestionFormErrors = {
  selectedQuiz: string | null;
  question: string | null;
  choices: (string | null)[];
  correctAnswer: string | null;
};

const fieldErrors = reactive<QuestionFormErrors>({
  selectedQuiz: null,
  question: null,
  choices: [null, null, null, null],
  correctAnswer: null,
});

const errorMessage = ref<string | null>(null);

function validateForm(
  cleanedQuestion: string,
  cleanedChoices: string[],
  cleanedCorrectAnswer: string,
) {
  let isValid = true;

  if (!selectedQuiz.value) {
    fieldErrors.selectedQuiz = 'Veuillez sélectionner un quiz.';
    isValid = false;
  } else {
    fieldErrors.selectedQuiz = null;
  }

  if (!cleanedQuestion) {
    fieldErrors.question = 'Veuillez entrer une question.';
    isValid = false;
  } else {
    fieldErrors.question = null;
  }

  cleanedChoices.forEach((choice, index) => {
    const choiceNumber = String(index + 1);
    if (!choice) {
      fieldErrors.choices[index] = `Veuillez entrer le choix ${choiceNumber}.`;
      isValid = false;
    } else {
      fieldErrors.choices[index] = null;
    }
  });

  if (!cleanedCorrectAnswer) {
    fieldErrors.correctAnswer = 'Veuillez entrer la bonne réponse.';
    isValid = false;
  } else if (!cleanedChoices.includes(cleanedCorrectAnswer)) {
    fieldErrors.correctAnswer =
      "La bonne réponse doit correspondre à l'un des choix.";
    isValid = false;
  } else {
    fieldErrors.correctAnswer = null;
  }
  return isValid;
}

function resetErrors() {
  fieldErrors.selectedQuiz = null;
  fieldErrors.question = null;
  fieldErrors.choices = [null, null, null, null];
  fieldErrors.correctAnswer = null;
  errorMessage.value = null;
}

function submit() {
  resetErrors();

  const cleanedQuestion = question.value.trim();
  const cleanedCorrectAnswer = correctAnswer.value.trim();
  const cleanedChoices = choices.value.map((choice) => choice.trim());

  if (validateForm(cleanedQuestion, cleanedChoices, cleanedCorrectAnswer)) {
    emit('submit', {
      quizId: selectedQuiz.value,
      question: cleanedQuestion,
      choices: cleanedChoices,
      correctAnswer: cleanedCorrectAnswer,
    });
  } else {
    errorMessage.value = 'Veuillez corriger les erreurs dans le formulaire.';
    return;
  }
}

const props = defineProps<{
  quizzes: Quiz[];
  editingQuestion: Question | null;
  isSubmitting: boolean;
}>();

const selectedQuiz = ref(props.editingQuestion?.quizId ?? '');
const question = ref(props.editingQuestion?.question ?? '');
const choices = ref(props.editingQuestion?.choices ?? ['', '', '', '']);
const correctAnswer = ref(props.editingQuestion?.correctAnswer ?? '');

const emit = defineEmits<{
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
    <button
      type="button"
      class="overlay"
      aria-label="Fermer la modale"
      @click="emit('close')"
    ></button>
    <div
      v-if="quizzes"
      class="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="question-modal-title"
    >
      <h2 id="question-modal-title">Ajouter une question</h2>
      <form @submit.prevent="submit">
        <div class="field">
          <label for="question-quiz">Quiz</label>
          <select
            id="question-quiz"
            v-model="selectedQuiz"
            :aria-describedby="
              fieldErrors.selectedQuiz ? 'question-quiz-error' : undefined
            "
            :aria-invalid="fieldErrors.selectedQuiz ? 'true' : undefined"
          >
            <option v-for="quiz in quizzes" :key="quiz.id" :value="quiz.id">
              {{ quiz.title }}
            </option>
          </select>
          <p
            v-if="fieldErrors.selectedQuiz"
            id="question-quiz-error"
            class="quiz-error"
          >
            {{ fieldErrors.selectedQuiz }}
          </p>
        </div>
        <div class="field">
          <label for="question-input">Question</label>
          <input
            id="question-input"
            v-model="question"
            type="text"
            :aria-describedby="
              fieldErrors.question ? 'question-error' : undefined
            "
            :aria-invalid="fieldErrors.question ? 'true' : undefined"
          />
          <p
            v-if="fieldErrors.question"
            id="question-error"
            class="question-error"
          >
            {{ fieldErrors.question }}
          </p>
        </div>
        <div v-for="(choice, index) in choices" :key="index" class="field">
          <label :for="'choice-' + index">Choix {{ index + 1 }}</label>
          <input
            :id="'choice-' + index"
            v-model="choices[index]"
            type="text"
            :aria-describedby="
              fieldErrors.choices[index]
                ? 'choice-' + index + '-error'
                : undefined
            "
            :aria-invalid="fieldErrors.choices[index] ? 'true' : undefined"
          />
          <p
            v-if="fieldErrors.choices[index]"
            :id="'choice-' + index + '-error'"
            class="choice-error"
          >
            {{ fieldErrors.choices[index] }}
          </p>
        </div>
        <div class="field">
          <label for="correct-answer">Bonne réponse</label>
          <input
            id="correct-answer"
            v-model="correctAnswer"
            type="text"
            :aria-describedby="
              fieldErrors.correctAnswer ? 'correct-answer-error' : undefined
            "
            :aria-invalid="fieldErrors.correctAnswer ? 'true' : undefined"
          />
          <p
            v-if="fieldErrors.correctAnswer"
            id="correct-answer-error"
            class="correct-answer-error"
          >
            {{ fieldErrors.correctAnswer }}
          </p>
        </div>
        <div v-if="errorMessage" class="error-message" role="alert">
          {{ errorMessage }}
        </div>

        <button :disabled="isSubmitting" type="submit">
          {{ editingQuestion ? 'Modifier' : 'Ajouter' }}
        </button>
      </form>
    </div>
  </Teleport>
</template>

<style scoped></style>
