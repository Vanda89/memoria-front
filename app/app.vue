<script setup lang="ts">
import { useUIStore } from '~/stores/ui';
const uiStore = useUIStore();
const { isCompactMode, layoutModeLabel } = storeToRefs(uiStore);
</script>

<template>
  <div :class="{ 'is-compact': isCompactMode }">
    <NuxtRouteAnnouncer />

    <button type="button" @click="uiStore.toggleCompactMode">
      {{ layoutModeLabel }}
    </button>

    <NuxtPage />
  </div>
</template>

<style scoped>
.is-compact {
  font-size: 0.8rem;
}
</style>
