<script setup lang="ts">
import { gql } from "graphql-tag";
import type { Sheet } from "~/types/sheet.ts";

const GET_SHEET_QUERY = gql`
  query GetSheet($id: ID!) {
    sheet(id: $id) {
      id
      title
      content
      subject
      difficulty
      level
    }
  }
`;

const { data } = await useAsyncQuery<{ sheet: Sheet }>(GET_SHEET_QUERY, {
  id: useRoute().params.id,
});
</script>

<template>
  <article class="sheet-detail" v-if="data">
    <h1 class="sheet-detail__title">{{ data.sheet.title }}</h1>
    <div class="sheet-detail__meta">
      <span class="sheet-detail__subject"> {{ data.sheet.subject }}</span>
      <span class="sheet-detail__difficulty"> {{ data.sheet.difficulty }}</span>
      <span class="sheet-detail__level"> {{ data.sheet.level }}</span>
    </div>
  </article>
</template>

<style lang="scss" scoped></style>
