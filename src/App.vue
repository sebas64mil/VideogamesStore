<script setup>
import ApiTest from '@/components/ApiTest.vue'

import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import SectionCards from '@/components/SectionCards.vue'
import Footer from '@/components/Footer.vue'
import { useMenuStore } from '@/stores/menu'
import { watch } from 'vue'

const menuStore = useMenuStore()

// Bloquear scroll del body cuando el sidebar está abierto
watch(
  () => menuStore.isOpen,
  (isOpen) => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  },
)
</script>

<template>
  <Navbar />
  <main class="main-content">
    <!-- Overlay para cerrar sidebar en responsive -->
    <div v-if="menuStore.isOpen" class="sidebar-overlay" @click="menuStore.close" />

    <Sidebar :class="{ 'sidebar--open': menuStore.isOpen }" />

    <SectionCards />
  </main>
  <Footer />
</template>

<style scoped>
.main-content {
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  padding-top: 77px; /* altura aproximada del navbar */
  min-height: 100vh;
  background: var(--color-principal);
  position: relative;
}

/* Overlay */
.sidebar-overlay {
  display: none;
}

/* Tablet (≤ 1024px) */
@media (max-width: 1024px) {
  .sidebar-overlay {
    display: block;
    position: fixed;
    top: 77px;
    left: 0;
    width: 100%;
    height: calc(100% - 77px);
    background: rgba(0, 0, 0, 0.5);
    z-index: 99;
  }
}
</style>
