<script setup>
import BaseButton from '@/components/Button.vue'

import {
  IconPC,
  IconPlayStation,
  IconXbox,
  IconNinten,
  IconIos,
  IconAndroid,
  IconPlus,
  IconGift,
} from '@/Icons'

const props = defineProps({
  id: {
    type: Number,
    default: null,
  },
  title: String,
  image: String,
  releaseDate: String,
  genre: String,
  chart: String,
  isInWishlist: {
    type: Boolean,
    default: false,
  },
  isInLibrary: {
    type: Boolean,
    default: false,
  },
  platforms: {
    type: Array,
    default: () => [],
  },
})

const emits = defineEmits(['toggle-wishlist', 'toggle-library'])

const toggleLibrary = () => {
  if (props.id == null) return
  emits('toggle-library', props.id)
}

const toggleWishlist = () => {
  if (props.id == null) return
  emits('toggle-wishlist', props.id)
}

const platformMap = {
  PC: IconPC,
  PlayStation: IconPlayStation,
  Xbox: IconXbox,
  Nintendo: IconNinten,
  iOS: IconIos,
  Android: IconAndroid,
}
</script>

<template>
  <div class="card">
    <!-- Imagen superior -->
    <img :src="image" class="card__image" />

    <div class="card__content">
      <!-- Platforms -->
      <div class="platforms">
        <component
          v-for="platform in platforms"
          :key="platform"
          :is="platformMap[platform]"
          :size="14"
        />
      </div>

      <!-- Title -->
      <div class="card__title">
        {{ title }}
      </div>

      <!-- Buttons -->
      <div class="card__buttons">
        <BaseButton
          size="sm"
          variant="filled"
          :class="{ 'card-action--active': isInLibrary }"
          @click="toggleLibrary"
        >
          <template #icon>
            <IconPlus :size="14" />
          </template>
          {{ isInLibrary ? 'In Library' : 'Add' }}
        </BaseButton>

        <BaseButton
          size="sm"
          variant="filled"
          iconOnly
          :class="{ 'card-action--active': isInWishlist }"
          @click="toggleWishlist"
        >
          <template #icon>
            <IconGift :size="14" />
          </template>
        </BaseButton>
      </div>

      <!-- Info -->
      <div class="card__info">
        <div class="info-row">
          <span>Release date:</span>
          <span class="underline">{{ releaseDate }}</span>
        </div>

        <div class="info-row">
          <span>Genre:</span>
          <span class="underline">{{ genre }}</span>
        </div>

        <div class="info-row">
          <span>Chart:</span>
          <span class="underline">{{ chart }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 224px;
  border-radius: var(--radius-s);
  overflow: hidden;
  background: var(--color-principal);
  outline: 2px solid var(--color-secondary);
  display: flex;
  flex-direction: column;

  /* transición suave */
  transition:
    box-shadow 0.3s ease,
    transform 0.3s ease;
}

/* sombra solo en hover */
.card:hover {
  box-shadow: 0px 0px 8px 2px var(--color-secondary);
}

/* Imagen superior */
.card__image {
  width: 100%;
  height: 149px;
  object-fit: cover;
}

/* Contenido */
.card__content {
  padding: 20px 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* Elements */
.platforms {
  display: flex;
  gap: 4px;
  color: var(--color-secondary);
}

.card__title {
  font-family: var(--font-lemon);
  font-size: var(--fs-4);
  color: var(--color-secondary);
}

.card__buttons {
  display: flex;
  gap: 7px;
}

.card__info {
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.card-action--active {
  box-shadow:
    0px 0px 8px var(--color-secondary),
    0px 0px 28px 6px var(--color-principal) inset;
}

.info-row {
  display: flex;
  justify-content: space-between;
  font-size: var(--fs-0);
  font-family: var(--font-lemon);
  color: var(--color-secondary);
}

.underline {
  text-decoration: underline;
}
</style>
