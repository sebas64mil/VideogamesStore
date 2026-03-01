<script setup>  

const props = defineProps({
  size: {
    type: Number,
    default: 24
  }
})
</script>
<template>
<svg
  :width="size"
  :height="size"
  viewBox="0 0 26 26"
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
>
     <path
             fill-rule="evenodd"
        clip-rule="evenodd"
d="M18.4167 20.5833H7.58341V5.41667H18.4167M18.4167 1.08334H7.58341C6.38091 1.08334 5.41675 2.0475 5.41675 3.25V22.75C5.41675 23.3246 5.64502 23.8757 6.05135 24.2821C6.45768 24.6884 7.00878 24.9167 7.58341 24.9167H18.4167C18.9914 24.9167 19.5425 24.6884 19.9488 24.2821C20.3551 23.8757 20.5834 23.3246 20.5834 22.75V3.25C20.5834 2.67537 20.3551 2.12427 19.9488 1.71794C19.5425 1.31161 18.9914 1.08334 18.4167 1.08334Z"   fill="currentColor"
      />

</svg>
</template>    


