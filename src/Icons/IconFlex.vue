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
d="M2.16663 21.6667V14.0833H11.9166V21.6667H2.16663ZM2.16663 11.9167V4.33334H11.9166V11.9167H2.16663ZM4.33329 9.75H9.74996V6.5H4.33329V9.75ZM19.5 21.6667L14.0833 16.25L15.6 14.7333L18.4166 17.5229V4.33334H20.5833V17.5229L23.4 14.7333L24.9166 16.25L19.5 21.6667Z"   fill="currentColor"
      />

</svg>
</template>    


