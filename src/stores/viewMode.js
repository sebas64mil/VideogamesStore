import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

const STORAGE_KEY = 'videogamestore:view-mode'

const getInitialMode = () => {
  try {
    const savedMode = localStorage.getItem(STORAGE_KEY)
    return savedMode === 'flex' || savedMode === 'grid' ? savedMode : 'grid'
  } catch (error) {
    console.error('Error reading view mode from storage:', error)
    return 'grid'
  }
}

export const useViewModeStore = defineStore('viewMode', () => {
  const desktopMode = ref(getInitialMode())

  const setDesktopMode = (mode) => {
    if (mode !== 'flex' && mode !== 'grid') return
    desktopMode.value = mode
  }

  watch(desktopMode, (mode) => {
    localStorage.setItem(STORAGE_KEY, mode)
  })

  return {
    desktopMode,
    setDesktopMode,
  }
})
