<script setup lang="ts">
import { gql } from 'graphql-tag';
import type { Sheet } from '~/types/sheet.ts';

const GET_SHEETS_QUERY = gql`
  query GetSheets {
    sheets {
      id
      title
      content
      subject
      difficulty
      level
    }
  }
`;
const { data } = await useAsyncQuery<{ sheets: Sheet[] }>(GET_SHEETS_QUERY);
</script>

<template>
  <div v-if="data" class="sheets-list">
    <article v-for="sheet in data.sheets" :key="sheet.id" class="sheet-card">
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
