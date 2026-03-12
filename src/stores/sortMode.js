import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

const STORAGE_KEY = 'videogamestore:relevance-sort-order'

const getInitialSortOrder = () => {
  try {
    const savedOrder = localStorage.getItem(STORAGE_KEY)
    return savedOrder === 'asc' || savedOrder === 'desc' ? savedOrder : 'desc'
  } catch (error) {
    console.error('Error reading sort order from storage:', error)
    return 'desc'
  }
}

export const useSortModeStore = defineStore('sortMode', () => {
  const relevanceSortOrder = ref(getInitialSortOrder())

  const toggleRelevanceSortOrder = () => {
    relevanceSortOrder.value = relevanceSortOrder.value === 'desc' ? 'asc' : 'desc'
  }

  watch(relevanceSortOrder, (value) => {
    localStorage.setItem(STORAGE_KEY, value)
  })

  return {
    relevanceSortOrder,
    toggleRelevanceSortOrder,
  }
})
