import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

const normalizeText = (value) => value?.toLowerCase().trim() || ''

const platformAliases = {
  pc: 'PC',
  playstation: 'PlayStation',
  'playstation 4': 'PlayStation',
  xbox: 'Xbox',
  'xbox one': 'Xbox',
  nintendo: 'Nintendo',
  'nintendo switch': 'Nintendo',
  ios: 'iOS',
  android: 'Android',
}

export const useFiltersStore = defineStore('filters', () => {
  const selectedGenre = ref(null)
  const selectedPlatform = ref(null)
  const freeOnly = ref(false)
  const userListFilter = ref(null)

  const hasActiveFilters = computed(
    () =>
      !!selectedGenre.value || !!selectedPlatform.value || freeOnly.value || !!userListFilter.value,
  )

  function setGenre(genre) {
    const normalizedGenre = normalizeText(genre)
    selectedGenre.value = selectedGenre.value === normalizedGenre ? null : normalizedGenre
  }

  function setPlatform(platform) {
    const normalizedPlatform = normalizeText(platform)
    const mappedPlatform = platformAliases[normalizedPlatform] || platform

    selectedPlatform.value = selectedPlatform.value === mappedPlatform ? null : mappedPlatform
  }

  function toggleFreeOnly() {
    freeOnly.value = !freeOnly.value
  }

  function clearFilters() {
    selectedGenre.value = null
    selectedPlatform.value = null
    freeOnly.value = false
    userListFilter.value = null
  }

  function setUserListFilter(filterName) {
    userListFilter.value = userListFilter.value === filterName ? null : filterName
  }

  function isUserListFilterActive(filterName) {
    return userListFilter.value === filterName
  }

  function isGenreActive(genre) {
    return selectedGenre.value === normalizeText(genre)
  }

  function isPlatformActive(platform) {
    const normalizedPlatform = normalizeText(platform)
    const mappedPlatform = platformAliases[normalizedPlatform] || platform
    return selectedPlatform.value === mappedPlatform
  }

  return {
    selectedGenre,
    selectedPlatform,
    freeOnly,
    userListFilter,
    hasActiveFilters,
    setGenre,
    setPlatform,
    toggleFreeOnly,
    setUserListFilter,
    clearFilters,
    isGenreActive,
    isPlatformActive,
    isUserListFilterActive,
  }
})
