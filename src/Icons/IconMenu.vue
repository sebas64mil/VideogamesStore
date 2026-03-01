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
d="M1.625 4.875V8.125H24.375V4.875H1.625ZM1.625 11.375V14.625H24.375V11.375H1.625ZM1.625 17.875V21.125H24.375V17.875H1.625Z"  fill="currentColor"
      />

</svg>
</template>    


