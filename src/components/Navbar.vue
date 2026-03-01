<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import SearchInput from './SearchInput.vue'
import Button from './Button.vue'
import { IconTheme, IconMenu } from '@/Icons'
import { useMenuStore } from '@/stores/menu'

const menuStore = useMenuStore()
const searchQuery = ref('')
const isVisible = ref(true)

let lastScroll = 0

const handleScroll = () => {
  const currentScroll = window.scrollY

  if (currentScroll > lastScroll && currentScroll > 80) {
    // Bajando
    isVisible.value = false
  } else {
    // Subiendo
    isVisible.value = true
  }

  lastScroll = currentScroll
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav :class="['navbar', { 'navbar--hidden': !isVisible }]">
    <div class="navbar__logo">LVSV</div>

    <div class="navbar__search">
      <SearchInput v-model="searchQuery" />
    </div>

    <div class="navbar__actions">
      <Button variant="filled" size="lg" :icon-only="true">
        <template #icon>
          <IconTheme :size="20" />
        </template>
      </Button>

      <Button variant="filled" size="lg">Log IN</Button>
      <Button variant="filled" size="lg">Sign UP</Button>
    </div>

    <!-- Botón menú (tablet/mobile) -->
    <Button
      class="navbar__menu-btn"
      variant="filled"
      size="sm"
      :icon-only="true"
      @click="menuStore.toggle"
    >
      <template #icon>
        <IconMenu :size="20" />
      </template>
    </Button>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  padding: 14px var(--layout-padding);
  box-sizing: border-box;

  background: var(--color-principal);
  border-bottom: 2px solid var(--color-secondary);

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-2xl);

  transition: transform 0.3s ease;
  z-index: 1000;
}

/* Oculto */
.navbar--hidden {
  transform: translateY(-100%);
}

/* LOGO */
.navbar__logo {
  color: var(--color-secondary);
  font-family: var(--font-oswald);
  font-size: var(--fs-8);
  font-weight: var(--fw-bold);
  line-height: var(--lh-0);
  white-space: nowrap;
}

.navbar__search {
  flex: 1;
  max-width: var(--layout-search-width);
  display: flex;
  justify-content: center;
}

.navbar__actions {
  display: flex;
  align-items: center;
  gap: 23px;
}

/* Botón de menú (oculto por defecto) */
.navbar__menu-btn {
  display: none;
}

/* =========================
   RESPONSIVE - MOBILE (≤ 438px)
========================= */
@media (max-width: 438px) {
  .navbar {
padding: 4px var(--layout-padding)  

}

  .navbar__actions {
    display: none;
  }

  .navbar__menu-btn {
    display: flex;
  }
}
</style>
