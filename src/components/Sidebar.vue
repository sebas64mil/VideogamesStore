<script setup>
import BaseButton from '@/components/Button.vue'
import { useMenuStore } from '@/stores/menu'
import { useFiltersStore } from '@/stores/filters'
import { useCollectionStore } from '@/stores/collection'

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
const filtersStore = useFiltersStore()
const collectionStore = useCollectionStore()

const genreLabels = [
  'Action',
  'Strategy',
  'RPG',
  'Shooter',
  'Adventure',
  'Puzzle',
  'Racing',
  'Sports',
]
const platformLabels = ['PC', 'PlayStation 4', 'Xbox One', 'Nintendo Switch', 'iOS', 'Android']

const onSidebarItemClick = (sectionTitle, itemLabel) => {
  if (itemLabel === 'Home') {
    if (typeof filtersStore.clearFilters === 'function') {
      filtersStore.clearFilters()
    }
  }

  if (sectionTitle === 'Genres') {
    if (itemLabel === 'Free only games') {
      if (typeof filtersStore.toggleFreeOnly === 'function') {
        filtersStore.toggleFreeOnly()
      }
    } else if (genreLabels.includes(itemLabel)) {
      if (typeof filtersStore.setGenre === 'function') {
        filtersStore.setGenre(itemLabel)
      }
    }
  }

  if (sectionTitle === 'User') {
    if (itemLabel === 'Wishlist') {
      if (typeof filtersStore.setUserListFilter === 'function') {
        filtersStore.setUserListFilter('wishlist')
      }
    }

    if (itemLabel === 'Library') {
      if (typeof filtersStore.setUserListFilter === 'function') {
        filtersStore.setUserListFilter('library')
      }
    }
  }

  if (sectionTitle === 'Platforms' && platformLabels.includes(itemLabel)) {
    if (typeof filtersStore.setPlatform === 'function') {
      filtersStore.setPlatform(itemLabel)
    }
  }

  menuStore.close()
}

const isItemActive = (sectionTitle, itemLabel) => {
  if (itemLabel === 'Home') {
    return !filtersStore.hasActiveFilters
  }

  if (sectionTitle === 'Genres') {
    if (itemLabel === 'Free only games') {
      return filtersStore.freeOnly
    }

    if (typeof filtersStore.isGenreActive === 'function') {
      return filtersStore.isGenreActive(itemLabel)
    }

    return false
  }

  if (sectionTitle === 'Platforms') {
    if (typeof filtersStore.isPlatformActive === 'function') {
      return filtersStore.isPlatformActive(itemLabel)
    }

    return false
  }

  if (sectionTitle === 'User') {
    if (itemLabel === 'Wishlist') {
      if (typeof filtersStore.isUserListFilterActive === 'function') {
        return filtersStore.isUserListFilterActive('wishlist')
      }

      return filtersStore.userListFilter === 'wishlist'
    }

    if (itemLabel === 'Library') {
      if (typeof filtersStore.isUserListFilterActive === 'function') {
        return filtersStore.isUserListFilterActive('library')
      }

      return filtersStore.userListFilter === 'library'
    }
  }

  return false
}

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

const getItemLabel = (sectionTitle, itemLabel) => {
  if (sectionTitle === 'User' && itemLabel === 'Wishlist') {
    return `Wishlist (${collectionStore.wishlistCount || 0})`
  }

  if (sectionTitle === 'User' && itemLabel === 'Library') {
    return `Library (${collectionStore.libraryCount || 0})`
  }

  return itemLabel
}
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
            :class="[
              'sidebar-button',
              { 'sidebar-button--active': isItemActive(section.title, item.label) },
            ]"
            @click="onSidebarItemClick(section.title, item.label)"
          >
            {{ getItemLabel(section.title, item.label) }}

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

.sidebar-button--active {
  box-shadow: 0px 0px 8px 2px var(--gray-2);
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
