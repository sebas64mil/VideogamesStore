<script setup>
import { ref } from 'vue'
import { IconLets } from '@/Icons' // puedes cambiar por IconSearch si tienes uno

const model = defineModel()

const isFocused = ref(false)
</script>

<template>
  <div
    class="search"
    :class="{ 'search--active': isFocused }"
  >
    <!-- ICON -->
    <div class="search__icon">
      <!-- cambia por tu IconSearch si ya lo tienes -->
      <IconLets :size="20" />
    </div>

    <!-- INPUT -->
    <input
      v-model="model"
      type="text"
      placeholder="Search"
      class="search__input"
      @focus="isFocused = true"
      @blur="isFocused = false"
    />
  </div>
</template>

<style scoped>
.search {
  width: 100%;
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2xs);

  padding: var(--spacing-2xs) var(--spacing-xs);

  background: var(--gray-1);
  border-radius: var(--radius-6xl);

  transition: all 0.2s ease;
}

.search--active {
  background: var(--color-principal);
  box-shadow: 0 0 4px 1px var(--gray-2);
  outline: 1px solid var(--color-secondary);
  outline-offset: -1px;
  border-style: dashed;
  border-color: var(--color-secondary);
}

.search__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-secondary);
}

.search__input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;

  color: var(--color-secondary);

  font-family: var(--font-lemon);
  font-size: var(--fs-3);
  line-height: var(--lh-5);
  font-weight: var(--fw-regular);
}

.search__input::placeholder {
  color: var(--color-secondary);
  opacity: 0.7;
}
</style>