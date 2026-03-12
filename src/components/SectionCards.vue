<script setup>
import { ref, onMounted, computed } from 'vue'
import BaseButton from '@/components/Button.vue'
import CardGame from '@/components/CardGame.vue'
import { IconGrid, IconFlex, IconArrow, IconMenu } from '@/Icons'
import { apiService } from '@/services/apiService'
import { useMenuStore } from '@/stores/menu'
import { useFiltersStore } from '@/stores/filters'
import { useCollectionStore } from '@/stores/collection'
import { useViewModeStore } from '@/stores/viewMode'
import { useSortModeStore } from '@/stores/sortMode'
import { useSearchStore } from '@/stores/search'

const menuStore = useMenuStore()
const filtersStore = useFiltersStore()
const collectionStore = useCollectionStore()
const viewModeStore = useViewModeStore()
const sortModeStore = useSortModeStore()
const searchStore = useSearchStore()

// Estado reactivo para los juegos
const games = ref([])
const loading = ref(true)
const error = ref(null)

// Mapeo de plataformas de la API a los nombres que usa CardGame
const mapPlatform = (platformName) => {
  const name = platformName.toLowerCase()
  if (name.includes('pc') || name.includes('windows')) return 'PC'
  if (name.includes('playstation')) return 'PlayStation'
  if (name.includes('xbox')) return 'Xbox'
  if (name.includes('nintendo') || name.includes('switch') || name.includes('wii'))
    return 'Nintendo'
  if (name.includes('ios') || name.includes('iphone') || name.includes('ipad')) return 'iOS'
  if (name.includes('android')) return 'Android'
  return null
}

// Formatear fecha para mostrar
const formatDate = (dateString) => {
  if (!dateString) return 'TBA'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

// Mapear datos de la API al formato de CardGame
const mapGameData = (game, index) => ({
  id: game.id,
  title: game.name,
  image: game.background_image,
  releaseDate: formatDate(game.released),
  genre: game.genres?.[0]?.name || 'Unknown',
  genres: game.genres?.map((genre) => genre.name.toLowerCase()) || [],
  isFreeToPlay:
    game.tags?.some((tag) => {
      const normalizedTag = tag.name?.toLowerCase() || ''
      return normalizedTag.includes('free to play') || normalizedTag.includes('free-to-play')
    }) || false,
  chart: `#${index + 1}`,
  platforms: [
    ...new Set(game.platforms?.map((p) => mapPlatform(p.platform.name)).filter(Boolean) || []),
  ],
})

const filteredGames = computed(() => {
  return games.value.filter((game) => {
    const matchGenre =
      !filtersStore.selectedGenre || game.genres.includes(filtersStore.selectedGenre)
    const matchPlatform =
      !filtersStore.selectedPlatform || game.platforms.includes(filtersStore.selectedPlatform)
    const matchFreeOnly = !filtersStore.freeOnly || game.isFreeToPlay
    const matchSearch =
      !searchStore.normalizedQuery ||
      game.title.toLowerCase().includes(searchStore.normalizedQuery) ||
      game.genre.toLowerCase().includes(searchStore.normalizedQuery)
    const matchUserList =
      !filtersStore.userListFilter ||
      (filtersStore.userListFilter === 'wishlist' && collectionStore.isInWishlist(game.id)) ||
      (filtersStore.userListFilter === 'library' && collectionStore.isInLibrary(game.id))

    return matchGenre && matchPlatform && matchFreeOnly && matchSearch && matchUserList
  })
})

const getChartValue = (chart) => {
  const numericValue = Number.parseInt(String(chart).replace('#', ''), 10)
  return Number.isNaN(numericValue) ? 0 : numericValue
}

const sortedGames = computed(() => {
  const orderedGames = [...filteredGames.value]

  orderedGames.sort((a, b) => {
    const chartA = getChartValue(a.chart)
    const chartB = getChartValue(b.chart)

    return sortModeStore.relevanceSortOrder === 'desc' ? chartB - chartA : chartA - chartB
  })

  return orderedGames
})

const relevanceSortLabel = computed(() => {
  return sortModeStore.relevanceSortOrder === 'desc' ? 'High to Low' : 'Low to High'
})

const cardsLayoutClass = computed(() => {
  return viewModeStore.desktopMode === 'flex' ? 'cards-grid--flex' : 'cards-grid--grid'
})

// Cargar juegos al montar el componente
onMounted(async () => {
  try {
    loading.value = true
    const data = await apiService.getGames(50)
    games.value = (data.results || []).map(mapGameData)
  } catch (err) {
    error.value = err.message
    console.error('Error cargando juegos:', err)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section class="top-picks-container">
    <!-- Botón menú (solo tablet) -->
    <BaseButton
      class="menu-btn-tablet"
      size="sm"
      variant="filled"
      iconOnly
      @click="menuStore.toggle"
    >
      <template #icon>
        <IconMenu :size="26" />
      </template>
    </BaseButton>

    <!-- Título -->
    <h2 class="section-title">TOP PICKS</h2>

    <!-- Header con controles -->
    <header class="controls-header">
      <!-- Botón Order By (izquierda) -->
      <BaseButton
        size="sm"
        variant="filled"
        iconPosition="right"
        @click="sortModeStore.toggleRelevanceSortOrder"
      >
        Order By: Relevance {{ relevanceSortLabel }}
        <template #icon>
          <IconArrow :size="26" />
        </template>
      </BaseButton>

      <!-- Botones de vista (derecha) -->
      <nav class="view-controls">
        <BaseButton
          size="sm"
          variant="filled"
          iconOnly
          :class="{ 'view-btn--active': viewModeStore.desktopMode === 'flex' }"
          @click="viewModeStore.setDesktopMode('flex')"
        >
          <template #icon>
            <IconFlex :size="26" />
          </template>
        </BaseButton>
        <BaseButton
          size="sm"
          variant="filled"
          iconOnly
          :class="{ 'view-btn--active': viewModeStore.desktopMode === 'grid' }"
          @click="viewModeStore.setDesktopMode('grid')"
        >
          <template #icon>
            <IconGrid :size="26" />
          </template>
        </BaseButton>
      </nav>
    </header>

    <!-- Grid de cartas -->
    <section :class="['cards-grid', cardsLayoutClass]">
      <!-- Estado de carga -->
      <div v-if="loading" class="loading-state">
        <p>Cargando juegos...</p>
      </div>

      <!-- Estado de error -->
      <div v-else-if="error" class="error-state">
        <p>Error: {{ error }}</p>
      </div>

      <!-- Lista de juegos -->
      <template v-else>
        <CardGame
          v-for="game in sortedGames"
          :key="game.id"
          :id="game.id"
          :title="game.title"
          :image="game.image"
          :releaseDate="game.releaseDate"
          :genre="game.genre"
          :chart="game.chart"
          :platforms="game.platforms"
          :is-in-wishlist="collectionStore.isInWishlist(game.id)"
          :is-in-library="collectionStore.isInLibrary(game.id)"
          @toggle-wishlist="collectionStore.toggleWishlist"
          @toggle-library="collectionStore.toggleLibrary"
        />

        <div v-if="!sortedGames.length" class="empty-state">
          <p>No hay juegos que coincidan con tu filtro actual.</p>
        </div>
      </template>
    </section>
  </section>
</template>

<style scoped>
.top-picks-container {
  flex: 1;
  padding: var(--spacing-s) var(--spacing-9xl);
  background: var(--color-principal);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-l);
  color: var(--color-secondary);
}

.section-title {
  align-self: stretch;
  font-family: var(--font-oswald);
  font-size: var(--fs-8);
  font-weight: var(--fw-bold);
  line-height: var(--lh-0);
  color: var(--color-secondary);
}

.controls-header {
  align-self: stretch;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.view-controls {
  display: flex;
  gap: var(--spacing-xs);
}

.view-btn--active {
  box-shadow:
    0px 2px 3.8px var(--color-secondary),
    0px 0px 24px 4px var(--color-principal) inset;
}

/* Grid de cartas */
.cards-grid {
  align-self: stretch;
  gap: var(--spacing-2xl);
}

.cards-grid--grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

.cards-grid--flex {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: flex-start;
}

/* Estados de carga y error */
.loading-state,
.error-state,
.empty-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: var(--spacing-2xl);
  font-family: var(--font-lemon);
  color: var(--color-secondary);
}

.loading-state p {
  font-size: var(--fs-4);
}

.error-state p {
  font-size: var(--fs-2);
  color: #ff6b6b;
}

.empty-state p {
  font-size: var(--fs-2);
}

/* Botón menú tablet (oculto por defecto) */
.menu-btn-tablet {
  display: none;
  align-self: flex-start;
}

/* =========================
   RESPONSIVE - TABLET (≤ 1024px)
========================= */
@media (max-width: 1024px) {
  .top-picks-container {
    padding: var(--spacing-s) var(--spacing-l);
  }

  .menu-btn-tablet {
    display: inline-flex;
  }
}

/* =========================
   RESPONSIVE - MOBILE (≤ 438px)
========================= */
@media (max-width: 438px) {
  .top-picks-container {
    padding: var(--spacing-s) var(--spacing-m);
  }

  .menu-btn-tablet {
    display: none;
  }

  .cards-grid {
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
  }
}
</style>
