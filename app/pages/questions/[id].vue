<script setup lang="ts">
const { question } = useQuestion(useRoute().params.id as string);
const hasValidated = ref(false);
const selectedChoice = ref<string | null>(null);

async function nextQuestion() {
  const otherQuestions =
    question.value?.quiz?.questions?.filter(
      (q) => q.id !== question.value?.id,
    ) ?? [];
  const randomIndex = Math.floor(Math.random() * otherQuestions.length);
  const chosenQuestion = otherQuestions[randomIndex];

  if (chosenQuestion) {
    await navigateTo(`/questions/${chosenQuestion.id}`);
  }
}
</script>

<template>
  <article v-if="question" class="question-detail">
    <h1 class="question-detail__title">{{ question.question }}</h1>
    <ul class="question-detail__choices">
      <li
        v-for="choice in question.choices"
        :key="choice"
        class="question-detail__choice"
      >
        <label
          :class="{
            correct: hasValidated && choice === question.correctAnswer,
            incorrect:
              hasValidated &&
              choice === selectedChoice &&
              choice !== question.correctAnswer,
          }"
        >
          <input v-model="selectedChoice" type="radio" :value="choice" />
          {{ choice }}
        </label>
      </li>
    </ul>
    <button @click="hasValidated ? nextQuestion() : (hasValidated = true)">
      {{ hasValidated ? 'Suivant' : 'Valider' }}
    </button>
    <p v-if="hasValidated" class="question-detail__correct-answer">
      {{ question.correctAnswer }}
    </p>
    <NuxtLink
      class="question-detail__link"
      :to="`/quizzes/${question.quizId}`"
      >{{ question.quiz?.title }}</NuxtLink
    >
  </article>
</template>

<style scoped>
.correct {
  color: green;
}
.incorrect {
  color: red;
}
</style>
