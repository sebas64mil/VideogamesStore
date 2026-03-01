<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'filled', // filled | outline
  },
  size: {
    type: String,
    default: 'lg', // lg | sm
  },
  iconPosition: {
    type: String,
    default: 'left', // left | right
  },
  iconOnly: {
    type: Boolean,
    default: false,
  },
})

const classes = computed(() => [
  'base-button',
  `base-button--${props.variant}`,
  `base-button--${props.size}`,
  {
    'base-button--icon-only': props.iconOnly,
  },
])
</script>

<template>
  <button :class="classes">
    <!-- Icon Left -->
    <span v-if="$slots.icon && iconPosition === 'left'" class="icon">
      <slot name="icon" />
    </span>

    <!-- Text -->
    <span v-if="!iconOnly" class="label">
      <slot />
    </span>

    <!-- Icon Right -->
    <span v-if="$slots.icon && iconPosition === 'right'" class="icon">
      <slot name="icon" />
    </span>
  </button>
</template>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2xs);
  cursor: pointer;
  transition: all 0.25s ease;
  font-family: var(--font-lemon);
  font-weight: var(--fw-regular);
  font-size: var(--fs-3);
  line-height: var(--lh-5);
  color: var(--color-secondary);
}

/* =========================
   SIZE
========================= */

.base-button--lg {
  padding: var(--spacing-xs) var(--spacing-s);
  border-radius: var(--radius-2xs);
}

.base-button--sm {
  padding: var(--spacing-2xs) var(--spacing-xs);
  font-size: var(--fs-2);
}

/* Icon Only */
.base-button--icon-only {
  padding: var(--spacing-xs);
}

/* =========================
   FILLED VARIANT
========================= */

.base-button--filled {
  background: linear-gradient(
    270deg,
    var(--gray-2) 0%,
    var(--color-principal) 50%,
    var(--gray-3) 100%
  );
  outline: 1px solid var(--color-secondary);
  outline-offset: -1px;
  box-shadow: 0px 0px 24px 4px var(--color-principal) inset;
}

.base-button--filled:hover {
  box-shadow:
    0px 0px 8px var(--color-secondary),
    0px 0px 28px 6px var(--color-principal) inset;
}

/* =========================
   OUTLINE VARIANT
========================= */

.base-button--outline {
  background: linear-gradient(
    270deg,
    rgba(67, 69, 85, 0) 0%,
    var(--gray-1) 50%,
    rgba(67, 69, 85, 0) 100%
  );
  border-top: 1px solid var(--color-secondary);
  border-bottom: 1px solid var(--color-secondary);

  border-left: none;
  border-right: none;
}

.base-button--outline:hover {
  box-shadow: 0px 0px 4px 2px var(--gray-2);
}

/* =========================
   ICON
========================= */

.icon {
  display: flex;
  align-items: center;
}

.label {
  white-space: nowrap;
}

/* =========================
   RESPONSIVE - TABLET (≤ 1024px)
========================= */
@media (max-width: 1024px) {
  .base-button--lg {
    padding: var(--spacing-2xs) var(--spacing-xs);
    font-size: var(--fs-2);
  }

  .base-button--lg.base-button--icon-only {
    padding: var(--spacing-2xs);
  }
}
</style>
