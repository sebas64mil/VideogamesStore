<script setup>
import BaseButton from '@/components/Button.vue'
import { useMenuStore } from '@/stores/menu'

import {
  IconHome,
  IconSettings,
  IconGift,
  IconLibrary,
  IconControl,
  IconAction,
  IconStrategy,
  IconRPG,
  IconShooter,
  IconAdventure,
  IconPuzzle,
  IconRacing,
  IconSports,
  IconPC,
  IconPlayStation,
  IconXbox,
  IconNinten,
  IconIos,
  IconAndroid,
  IconTheme,
} from '@/Icons'

const menuStore = useMenuStore()

const sections = [
  {
    title: 'General',
    items: [
      { label: 'Home', icon: IconHome },
      { label: 'Settings', icon: IconSettings },
    ],
  },
  {
    title: 'User',
    items: [
      { label: 'Wishlist', icon: IconGift },
      { label: 'Library', icon: IconLibrary },
    ],
  },
  {
    title: 'Genres',
    items: [
      { label: 'Free only games', icon: IconControl },
      { label: 'Action', icon: IconAction },
      { label: 'Strategy', icon: IconStrategy },
      { label: 'RPG', icon: IconRPG },
      { label: 'Shooter', icon: IconShooter },
      { label: 'Adventure', icon: IconAdventure },
      { label: 'Puzzle', icon: IconPuzzle },
      { label: 'Racing', icon: IconRacing },
      { label: 'Sports', icon: IconSports },
    ],
  },
  {
    title: 'Platforms',
    items: [
      { label: 'PC', icon: IconPC },
      { label: 'PlayStation 4', icon: IconPlayStation },
      { label: 'Xbox One', icon: IconXbox },
      { label: 'Nintendo Switch', icon: IconNinten },
      { label: 'iOS', icon: IconIos },
      { label: 'Android', icon: IconAndroid },
    ],
  },
]
</script>

<template>
  <aside class="sidebar">
    <!-- Botones del navbar (solo mobile) -->
    <nav class="sidebar-navbar-actions">
      <BaseButton variant="filled" size="sm" :icon-only="true">
        <template #icon>
          <IconTheme :size="20" />
        </template>
      </BaseButton>
      <BaseButton variant="filled" size="sm">Log IN</BaseButton>
      <BaseButton variant="filled" size="sm">Sign UP</BaseButton>
    </nav>

    <template v-for="(section, index) in sections" :key="section.title">
      <div class="sidebar-section">
        <h2 class="section-title">
          {{ section.title }}
        </h2>

        <div class="section-items">
          <BaseButton
            v-for="item in section.items"
            :key="item.label"
            variant="outline"
            size="sm"
            icon-position="right"
            class="sidebar-button"
          >
            {{ item.label }}

            <template #icon>
              <component :is="item.icon" :size="20" />
            </template>
          </BaseButton>
        </div>
      </div>

      <div v-if="index !== sections.length - 1" class="sidebar-divider" />
    </template>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 260px;
  min-height: 100%;
  padding: 14px 8px;
  background: var(--color-principal);
  border-right: 2px solid var(--color-secondary);

  display: flex;
  flex-direction: column;
  gap: 18px;
}

/* Botones del navbar en sidebar (ocultos por defecto) */
.sidebar-navbar-actions {
  display: none;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--color-secondary);
}

/* SECTION */
.sidebar-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* TITLE */
.section-title {
  color: var(--color-secondary);
  font-family: var(--font-oswald);
  font-size: var(--fs-6);
  font-weight: var(--fw-bold);
  line-height: var(--lh-2);
}

/* ITEMS */
.section-items {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

/* Ajuste específico para que el botón ocupe 100% */
.sidebar-button {
  width: 100%;
  justify-content: space-between;
  text-transform: uppercase;
}

/* Divider */
.sidebar-divider {
  height: 1px;
  background: var(--color-secondary);
  opacity: 0.6;
}

/* =========================
   RESPONSIVE - TABLET (≤ 1024px)
========================= */
@media (max-width: 1024px) {
  .sidebar {
    position: fixed;
    top: 60px;
    left: 0;
    height: calc(100vh - 77px);
    min-height: auto;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: 100;
    overflow-y: auto;
    padding-bottom: 70px;
  }

  .sidebar.sidebar--open {
    transform: translateX(0);
  }
}

/* =========================
   RESPONSIVE - MOBILE (≤ 438px)
========================= */
@media (max-width: 438px) {
  .sidebar-navbar-actions {
    display: flex;
  }
}
</style>
