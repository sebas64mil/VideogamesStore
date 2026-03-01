<script setup>
import { ref, onMounted } from 'vue'
import BaseButton from '@/components/Button.vue'
import CardGame from '@/components/CardGame.vue'
import { IconGrid, IconFlex, IconArrow, IconMenu } from '@/Icons'
import { apiService } from '@/services/apiService'
import { useMenuStore } from '@/stores/menu'

const menuStore = useMenuStore()

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
  chart: `#${index + 1}`,
  platforms: [
    ...new Set(game.platforms?.map((p) => mapPlatform(p.platform.name)).filter(Boolean) || []),
  ],
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
      <BaseButton size="sm" variant="filled" iconPosition="right">
        Order By: Relevance
        <template #icon>
          <IconArrow :size="26" />
        </template>
      </BaseButton>

      <!-- Botones de vista (derecha) -->
      <nav class="view-controls">
        <BaseButton size="sm" variant="filled" iconOnly class="view-btn--active">
          <template #icon>
            <IconFlex :size="26" />
          </template>
        </BaseButton>
        <BaseButton size="sm" variant="filled" iconOnly>
          <template #icon>
            <IconGrid :size="26" />
          </template>
        </BaseButton>
      </nav>
    </header>

    <!-- Grid de cartas -->
    <section class="cards-grid">
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
          v-for="game in games"
          :key="game.id"
          :title="game.title"
          :image="game.image"
          :releaseDate="game.releaseDate"
          :genre="game.genre"
          :chart="game.chart"
          :platforms="game.platforms"
        />
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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--spacing-2xl);
}

/* Estados de carga y error */
.loading-state,
.error-state {
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
    grid-template-columns: 1fr;
    justify-items: center;
  }
}
</style>
