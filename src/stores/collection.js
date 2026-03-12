import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'

const STORAGE_KEY = 'videogamestore:user-collection'

const parseStoredCollection = () => {
  try {
    const rawValue = localStorage.getItem(STORAGE_KEY)
    if (!rawValue) {
      return { wishlist: [], library: [] }
    }

    const parsedValue = JSON.parse(rawValue)
    return {
      wishlist: Array.isArray(parsedValue.wishlist) ? parsedValue.wishlist : [],
      library: Array.isArray(parsedValue.library) ? parsedValue.library : [],
    }
  } catch (error) {
    console.error('Error reading collection from storage:', error)
    return { wishlist: [], library: [] }
  }
}

export const useCollectionStore = defineStore('collection', () => {
  const initialValue = parseStoredCollection()

  const wishlistIds = ref(initialValue.wishlist)
  const libraryIds = ref(initialValue.library)

  const wishlistCount = computed(() => wishlistIds.value.length)
  const libraryCount = computed(() => libraryIds.value.length)

  const isInWishlist = (gameId) => wishlistIds.value.includes(gameId)
  const isInLibrary = (gameId) => libraryIds.value.includes(gameId)

  const toggleWishlist = (gameId) => {
    if (isInWishlist(gameId)) {
      wishlistIds.value = wishlistIds.value.filter((id) => id !== gameId)
      return
    }

    wishlistIds.value = [...wishlistIds.value, gameId]
  }

  const toggleLibrary = (gameId) => {
    if (isInLibrary(gameId)) {
      libraryIds.value = libraryIds.value.filter((id) => id !== gameId)
      return
    }

    libraryIds.value = [...libraryIds.value, gameId]
  }

  watch(
    [wishlistIds, libraryIds],
    ([wishlist, library]) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ wishlist, library }))
    },
    { deep: true },
  )

  return {
    wishlistIds,
    libraryIds,
    wishlistCount,
    libraryCount,
    isInWishlist,
    isInLibrary,
    toggleWishlist,
    toggleLibrary,
  }
})
