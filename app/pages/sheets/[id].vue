<script setup lang="ts">
const { sheet } = useSheet(useRoute().params.id as string);
</script>

<template>
  <article v-if="sheet" class="sheet-detail">
    <h1 class="sheet-detail__title">{{ sheet.sheet.title }}</h1>
    <div class="sheet-detail__meta">
      <span class="sheet-detail__subject"> {{ sheet.sheet.subject }}</span>
      <span class="sheet-detail__difficulty">
        {{ sheet.sheet.difficulty }}</span
      >
      <span class="sheet-detail__level"> {{ sheet.sheet.level }}</span>
    </div>
  </article>
</template>

<style lang="scss" scoped></style>
