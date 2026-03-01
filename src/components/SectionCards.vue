<script setup>
import BaseButton from '@/components/Button.vue'
import CardGame from '@/components/CardGame.vue'
import { IconGrid, IconFlex, IconArrow, IconMenu } from '@/Icons'
import TestImage from '@/Images/ImagenTest.jpg' // Asegúrate que esta ruta es correcta
import { useMenuStore } from '@/stores/menu'

const menuStore = useMenuStore()

// Generamos 10 cartas idénticas para test
const games = Array(10).fill({
  title: 'Game Test',
  image: TestImage,
  releaseDate: 'Dec 4, 2025',
  genre: 'Action',
  chart: '#1',
  platforms: ['PC', 'Xbox'],
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
      <CardGame
        v-for="(game, index) in games"
        :key="index"
        :title="game.title"
        :image="game.image"
        :releaseDate="game.releaseDate"
        :genre="game.genre"
        :chart="game.chart"
        :platforms="game.platforms"
      />
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
