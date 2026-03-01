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
d="M13 16.25L7.58337 10.8333H18.4167L13 16.25Z"    fill="currentColor"
      />

</svg>
</template>    


