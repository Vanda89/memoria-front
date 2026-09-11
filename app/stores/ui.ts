import { defineStore } from 'pinia';

type UIState = {
  isCompactMode: boolean;
};

export const useUIStore = defineStore('ui', {
  state: (): UIState => ({
    isCompactMode: false,
  }),
  getters: {
    layoutModeLabel: (state) =>
      state.isCompactMode ? 'Mode compact' : 'Mode confortable',
  },
  actions: {
    toggleCompactMode() {
      this.isCompactMode = !this.isCompactMode;
    },
  },
});
