import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

const normalizeText = (value) => value?.toLowerCase().trim() || ''

export const useSearchStore = defineStore('search', () => {
  const query = ref('')

  const normalizedQuery = computed(() => normalizeText(query.value))

  function clearQuery() {
    query.value = ''
  }

  return {
    query,
    normalizedQuery,
    clearQuery,
  }
})
