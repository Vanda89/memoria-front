<script setup lang="ts">
const { sheets } = useSheets();
</script>

<template>
  <div v-if="sheets" class="sheets-list">
    <article v-for="sheet in sheets.sheets" :key="sheet.id" class="sheet-card">
      <NuxtLink :to="`/sheets/${sheet.id}`">
        <h2 class="sheet-card__title">
          {{ sheet.title }}
        </h2>
        <span class="sheet-card__subject">{{ sheet.subject }}</span>
        <span class="sheet-card__difficulty">{{ sheet.difficulty }}</span>
        <span class="sheet-card__level">{{ sheet.level }}</span>
      </NuxtLink>
    </article>
  </div>
</template>

<style scoped></style>
