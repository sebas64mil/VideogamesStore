<script setup></script>

<template>
  <footer class="footer">
    <span class="footer-logo">LVSV</span>
  </footer>
</template>

<style scoped>
.footer {
  width: 100%;
  padding: var(--spacing-s) var(--layout-padding);
  background: var(--color-secondary);
  overflow: hidden;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-2xs);
  box-sizing: border-box;
}

.footer-logo {
  color: var(--color-principal);
  font-family: var(--font-oswald);
  font-size: var(--fs-8);
  font-weight: var(--fw-bold);
  line-height: var(--lh-0);
}
</style>
